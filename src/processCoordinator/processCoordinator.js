import view from './view.html';
import './local.less';
import _ from 'lodash';

const PROCESS_ID = 'initial';

class ProcessCoordinator {
  constructor($location, $uiModal, $cookies, muleConnector, questionParser, captureManager, verticalCode, verticalState, questionsEndpoint, needsRoute, recommendsRoute) {
    this.$location = $location;
    this.$uibModal = $uiModal;
    this.$cookies = $cookies;
    this.connector = muleConnector;
    this.questionParser = questionParser;
    this.captureManager = captureManager;
    this.verticalState = verticalState;
    this.needsRoute = needsRoute;
    this.recommendsRoute = recommendsRoute;

    this.steps = [
      {
        route: this.needsRoute,
        name: 'Your Needs',
        resetMessage: 'Select your needs again?'
      },
      {
        route: this.recommendsRoute,
        name: 'Recommendations',
        resetMessage: 'Choose a different policy?'
      },
    ];

    // Ensure a capture session exists. We don't care about the contents at this time.
    this.captureManager.getOrMakeCaptureCookie();

    this.verticalState.promisedQuestions =
      this.connector.GetQuestions(questionsEndpoint, verticalCode, PROCESS_ID)
        .then((response) => this.gotQuestions(response), (response) => this.failedToGetQuestions(response));
  }

  gotQuestions(response) {
    const questions = this.questionParser.transformToModel(response);
    this.fillRecommendationFeatures(response);
    return questions;
  }

  fillRecommendationFeatures(response) {
    this.verticalState.recFeatures.featureSuperset = response.featureSuperset;
    this.verticalState.recFeatures.features = response.features;
    this.verticalState.recFeatures.headers = response.headers;
  }

  failedToGetQuestions(response) {
    return new Error('Failed to get external questions. Status: ' + response.status);
  }

  stepState(stepNumber) {
    const currentStep = this.currentStep();
    if (stepNumber < currentStep) {
      return '';
    }
    if (stepNumber === currentStep) {
      return 'active';
    }
    return 'disabled';
  }

  stepActive(stepNumber) {
    return (stepNumber === this.currentStep());
  }

  // noinspection JSUnusedGlobalSymbols
  changeStep($event) {
    const stepNumber = $event.step;

    const resetModal = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'resetStep',
      resolve: {
        currentStep: this.currentStep(),
        stepNumber: stepNumber,
        step: this.steps[stepNumber - 1]
      }
    });

    resetModal.result.then(() => {
      this.$location.path(this.steps[ stepNumber - 1 ].route);
    }, () => {
    });
  }

  currentStep() {
    return 1 + _.findIndex(this.steps, { route: this.$location.path() });
  }
}

export default {
  bindings: {},
  template: view,
  controller: [
    '$location',
    '$uibModal',
    '$cookies',
    'muleConnector',
    'questionParser',
    'captureManager',
    'verticalCode',
    'verticalState',
    'muleNeedsApi',
    'needs.route',
    'recommends.route',
    ProcessCoordinator,
  ],
};

