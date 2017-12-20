import _ from 'lodash';
import './local.less';
import view from './view.html';

const RECOMMEND_PROCESS_ID = 'rec';

class RecommendCtrl {
  constructor(
    muleConnector,
    $location,
    usSpinnerService,
    $uibModal,
    imageLoader,
    deviceType,
    analytics,
    verticalCode,
    verticalState)
  {
    this.connector = muleConnector;
    this.$location = $location;
    this.usSpinnerService = usSpinnerService;
    this.$uibModal = $uibModal;
    this.imageLoader = imageLoader;
    this.deviceType = deviceType;
    this.analytics = analytics;
    this.verticalCode = verticalCode;
    this.verticalState = verticalState;

    this.featureSuperset = undefined;
    this.featureSet = undefined;

    this.results = undefined;
    this.productSets = [];
    this.activeTab = undefined;
    this.pageNumber = undefined;

    // noinspection JSUnusedGlobalSymbols
    this.paymentFrequency = undefined;

    this.verticalState.promisedQuestions.then(
      (questions) => this.deferredInit(questions)
    );

    this.analytics.stepChanged('results');
  }

  deferredInit(questions) {
    this.needsAnswers = this.verticalState.answers;

    if (_.isEmpty(this.needsAnswers)) {
      this.$location.path('/');
      return;
    }

    this.headers = this.verticalState.recFeatures.headers;
    this.featureSuperset = this.verticalState.recFeatures.featureSuperset;
    this.featureSet = this.verticalState.recFeatures.features;

    this.recQuestions = _.filter(questions, (form) => form.process === RECOMMEND_PROCESS_ID);

    // We depend on a needs schema rec question with options for payment frequency!!! Not sure if this vertical agnostic.
    const quickFilter = _.find(this.recQuestions, (formPage) => formPage.label === 'quick_filter');
    const paymentFrequencies = _.find(quickFilter.children, (question) => question.id === 'payment_frequency');
    this.paymentFrequency = _.find(paymentFrequencies.options, (option) => option.isdefault).key;

    this.fillResults(this.verticalState.recommendations);
  }

  fillResults(results) {
    this.usSpinnerService.stop('spinner-1');
    this.results = results;

    this.productSets = this.results.recommendations.sets;

    this.activeTab = 0;
    this.pageNumber = 0;
  }

  getVisibleProducts() {
    // For each rated product in the recommendation, return the products on the page.
    const visibleRatings = this.productSets[ this.activeTab];
    const products = visibleRatings.products.slice(this.startIndexForPage(), this.deviceColumns() * (this.pageNumber + 1));
    return _.map(products, (ratedProduct) => this.results.products[ ratedProduct.productId ]);
  }


  deviceColumns() {
    return this.deviceType.isDesktop() ? 4 : this.deviceType.isTablet() ? 3 : 2;
  }

  getPages() {
    return _.range(this.getTotalPages() + 1);
  }

  hasProducts() {
    return _.size(this.results.products) > 0;
  }

  /**
   * getTotalPages is a zero-indexed count of the number of pages for the products shown in the tab
   * divided by the number of columns shown on the device.
   * @returns {number}
   */
  getTotalPages() {
    //TODO
    return Math.ceil(_.size(this.productSets[ this.activeTab ].products) / this.deviceColumns()) - 1;
  }

  hasMoreThanOnePage() {
    return this.getTotalPages() > 0;
  }

  startIndexForPage() {
    return this.pageNumber * this.deviceColumns();
  }

  firstPage() {
    return this.pageNumber === 0;
  }

  lastPage() {
    return this.pageNumber === this.getTotalPages();
  }

  prevPage() {
    if (this.firstPage()) {
      return;
    }

    this.pageNumber--;
    this.postProductsShownAnalytics();
  }

  nextPage() {
    if (this.lastPage()) {
      return;
    }

    this.pageNumber++;
    this.postProductsShownAnalytics();
  }

  pageClick(gotoPage) {
    this.pageNumber = gotoPage;
    this.postProductsShownAnalytics();
  }

  // function to switch between the Tabs
  tabClick(value) {
    this.activeTab = value;
    this.pageNumber = 0;
    this.postProductsShownAnalytics();
  }

  displayBannerMessage(productDisplayed) {
    const activeTabProducts =  this.productSets[ this.activeTab ].products;
    return _.find(activeTabProducts, (product) => product.productId === productDisplayed.productCode).productMessage;
  }

  // function called by toggle-button
  changePaymentFrequency(frequency) {
    // noinspection JSUnusedGlobalSymbols
    this.paymentFrequency = frequency;
  }




  // noinspection JSUnusedGlobalSymbols
  apply($event) {
    this.postProductSelectedAnalytics($event.productCode)

    const modal = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'transitionModal',
      resolve: {
        quote: $event,
      }
    });

    // All behaviour is inside the modal.
    modal.result.then(() => {
    }).catch(() => {
    });
  }

  loadCustomiseImage(imageName) {
    this.image = this.imageLoader.getImage(imageName);
    return this.image;
  }

  loadCustomisePreferences() {
    const questions = this.recQuestions[ 1 ].children;
    this.openModal('customisePreferencesModal', questions);

  }




  // noinspection JSUnusedGlobalSymbols
  customisePrice($event) {
    const questions = this.recQuestions[ 0 ].children;
    this.openModal('customisePriceModal', questions);
  }

  openModal(comp, questions) {
    const customiseModal = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: comp,
      resolve: {
        questions: function () {
          return questions;
        },
        needsAnswer: this.needsAnswers
      }
    });

    customiseModal.result.then(
      (answers) => {
        _.forOwn(answers, (value, key) => {
          this.needsAnswers[ key ] = value;
        });
        this.usSpinnerService.spin('spinner-1');
        this.getRecommendations(this.needsAnswers);
        this.changePaymentFrequency(this.needsAnswers[ 'payment_frequency' ]);
      }
    );
  }


  onUpdate($event) {
    this.usSpinnerService.spin('spinner-1');
    this.needsAnswers = $event.answers;
    this.getRecommendations(this.needsAnswers);
    this.changePaymentFrequency(this.needsAnswers[ 'payment_frequency' ]);
  }

  // noinspection JSUnusedGlobalSymbols
  updatePaymentFrequency($event) {
    this.changePaymentFrequency($event.answer);
    this.needsAnswers[ $event.question ] = $event.answer;
  }

  getRecommendations(answers) {
    this.connector.GetRecommendationsForInitialQuote(answers)
      .then((response) => this.fillResults(response));
  }

  postProductsShownAnalytics() {
    // Get shown products and set the position based on the index for the page and the column.
    const shownProducts = _.map(
      this.getVisibleProducts(),
      (product, index) => ({
        product: product,
        position: this.startIndexForPage() + index
      })
    );
    this.analytics.productsShown(shownProducts, this.productSets[ this.activeTab ].setLabel);
  }

  postProductSelectedAnalytics(productCode) {
    const selectedProduct = this.results.products[ productCode ];
    const position = _.findIndex(
      this.resultSlides,
      (result) => result.productCode === selectedProduct
    );

    this.analytics.productSelected(selectedProduct, position);
  }
}

export default {
  bindings: {},
  template: view,
  controller: [
    'muleConnector',
    '$location',
    'usSpinnerService',
    '$uibModal',
    'imageLoader',
    'deviceType',
    'analytics',
    'verticalCode',
    'verticalState',
    RecommendCtrl,
  ],
};
