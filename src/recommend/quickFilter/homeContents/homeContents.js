import _ from 'lodash';
import './local.less';
import view from './view.html';

class HomeContentsCtrl {
  constructor($uiModal, imageLoader) {
    this.$uibModal = $uiModal;
    this.imageLoader = imageLoader;

    this.onUpdatePaymentFrequency = undefined;
    this.paymentFrequency = undefined;

    this.labelText = undefined;
    this.recQuestions = undefined;
    this.needsAnswers = undefined;
    this.updatedAnswers = undefined;
    this.onUpdated = undefined;
    this.toggleAnswers = [];
  }

  getValue(id) {
    var value;
    if(id === 'excess') {
      if(this.needsAnswers.hasOwnProperty(id))
        value = this.needsAnswers[id];
      else
        value = "500";
    }
    else if(id === 'payment_frequency') {
      if(this.needsAnswers.hasOwnProperty(id))
        value = this.needsAnswers[id];
      else
        value = "annualPremium";
    }
    else
      value = this.needsAnswers[id];
    return value;
  }

  onToggled($event) {
    this.onUpdatePaymentFrequency({
      $event: {
        question: $event.question,
        answer: $event.answer,
      },
    });
  }

  getToggleValue(id) {
    // var value;
    // if(this.needsAnswers.hasOwnProperty(id))
    //   value = this.needsAnswers[id];
    // else
    //   value = "annualPremium";
    // return value;
    this.needsAnswers[id] = this.paymentFrequency;
    return this.paymentFrequency;
  }

  openExcessDialog() {
    this.openDialog(this.recQuestions[0].children, 'customisePriceModal');
  }

  openDialog(questions, comp) {

    const resetModal = this.$uibModal.open({
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

    resetModal.result.then(
      (answers) => {
        this.updateNeedsAnswersAndReloadRecommendations(answers);
      }, () => {
      }
    );
  }

  openFeaturesDialog() {
    this.openDialog(this.recQuestions[1].children, 'customisePreferencesModal')
  }

  updateNeedsAnswersAndReloadRecommendations(answers) {
    _.forOwn(answers, (value, key) => {
      this.needsAnswers[key] = value ;
    } );

    this.onUpdated({
      $event: {
        answers: this.needsAnswers,
      },
    });
  }


  isVisible(qstn) {
    return qstn.visibility.test(this.needsAnswers);
  }

  loadCustomiseImage(imageName) {
    this.image = this.imageLoader.getImage(imageName);
    return this.image;
  }
}

export default {
  bindings: {
    recQuestions: '<',
    needsAnswers: '<',
    paymentFrequency: '<',
    onUpdated: '&',
    onUpdatePaymentFrequency: '&'
  },
  template: view,
  controller: ['$uibModal', 'imageLoader', HomeContentsCtrl ]
};

