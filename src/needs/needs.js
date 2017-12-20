import view from './view.html';
import _ from 'lodash';

const NEEDS_PROCESS_ID = 'initial';

/**
 * Needs represents the first step of an application where we establish the needs of the customer, before proceeding
 * to recommendations
 */
class Needs {
  constructor($log, $document, $q, $location, $uibModal, muleConnector, captureManager, analytics, verticalState, recommendsRoute) {
    this.$log = $log;
    this.$document = $document;
    this.$q = $q;
    this.$location = $location;
    this.$uibModal = $uibModal;
    this.connector = muleConnector;
    this.captureManager = captureManager;
    this.analytics = analytics;
    this.verticalState = verticalState;
    this.recommendsRoute = recommendsRoute;

    // Scope
    this.answers = undefined;
    this.resumeState = undefined;
    this.captureType = undefined;
    this.isCheckedTnC = false;
    this.isCheckedUnderstand = false;
    this.endstateApiPromises = [];

    this.promisedQuestions = verticalState.promisedQuestions.then(
      (questions) => this.deferredInit(questions)
    );

    this.analytics.stepChanged('needs');
  }

  deferredInit(questions) {
    this.answers = this.verticalState.answers;
    return _.filter(questions, (form) => form.process === NEEDS_PROCESS_ID);
  }

  // noinspection JSUnusedGlobalSymbols
  allAnswered() {
    if (this.captureType === undefined) {
      this.getCaptureDecision();
    }

    this.requestForRecommendations();
  }

  // noinspection JSUnusedGlobalSymbols
  answersUpdated($event) {
    if (!this.resumeState) {
      // This is the first answer given for the session.
      this.resumeState = $event;
    }

    if (this.resumeState.question === $event.question) {
      // Updated answer for question used to determine resume state. (After recommendations are requested).
      this.resumeState.answer = $event.answer;

      const sessionCanBeResumed = this.captureManager.canSessionBeResumed($event.question.id, $event.answer);
      if (sessionCanBeResumed) {
        // Preload answers from previous session.
        this.connector.getLatestNeeds()
          .then((previousAnswers) => this.answers = previousAnswers.needs)
          .catch((e) => {
            this.$log.warn(`Was expecting to resume a prior session, but getLatestNeeds failed: ${e.status}`)
          });
      }
    }
  }

  getCaptureDecision() {
    const previousCapture = this.captureManager.getPreviousCaptureDecision();
    if (previousCapture) {
      this.setCaptureType(previousCapture);
    } else {
      this.endstateApiPromises.push(
        this.connector.CheckForCaptureStatus(this.answers)
          .then((response) => this.receivedCaptureResponse(response))
      );
    }
  }

  receivedCaptureResponse(data) {
    const captureDecision = data.experience[0].value;
    this.captureManager.recordCaptureDecision(captureDecision);
    this.setCaptureType(captureDecision);
    this.analytics.stateCaptured('phonecapturestatus', captureDecision);
  }

  setCaptureType(decision) {
    switch (decision) {
      case 'Capture':
        this.captureType = 2;
        break;
      case 'OptCapture':
        this.captureType = 3;
        break;
      default:
        this.captureType = 1;
    }
  }

  requestForRecommendations() {
    this.endstateApiPromises.push(
      this.connector.GetRecommendationsForInitialQuote(this.answers)
        .then((response) => this.receivedRecommendations(response), (response) => this.failedRecommendationsResponse(response))
    );
  }

  receivedRecommendations(data) {
    this.verticalState.recommendations = data;

    if (this.resumeState) {
      this.captureManager.recordResumeState(this.resumeState.question.id, this.resumeState.answer);
    }
  }

  failedRecommendationsResponse(response) {
    return new Error('Failed to get recommendations. Status: ' + response.status);
  }

  questionsFinalised() {
    this.$q.all(this.endstateApiPromises).then(() => {
      if(!this.captureManager.wasLeadCreated() && this.captureType > 1)
        this.displayCaptureDialog(this.captureType);
      else {
        this.redirectToRecommendations();
      }
    });

    this.postAnalytics(this.answers);
  }

  displayCaptureDialog(captureType) {
    const captureModal = this.$uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      component: 'captureModal',
      resolve: {
        captureType: captureType,
      }
    });

    captureModal.result.then(
      (answer) => {
        this.createLead(answer);
        this.redirectToRecommendations();
      }, () => {
      }
    );
  }

  createLead(captureAnswers) {
    this.verticalState.capture.userDetails = captureAnswers;
    this.connector.sendUserDetailsToLeadAPI(this.answers, captureAnswers)
      .then((response) => this.receivedLeadResponse(response), (response) => this.failedLeadsResponse(response));
  }

  receivedLeadResponse(data) {
    this.captureManager.recordLeadCreated();
  }

  redirectToRecommendations() {
    this.$document.duScrollTop(0,500);

    this.$location.path(this.recommendsRoute);
  }

  postAnalytics(answers) {
    _.forEach(answers, (value, key) => this.analytics.inputCaptured(key, value));
  }
}

export default {
  bindings: {
  },
  template: view,
  controller: [
    '$log',
    '$document',
    '$q',
    '$location',
    '$uibModal',
    'muleConnector',
    'captureManager',
    'analytics',
    'verticalState',
    'recommends.route',
    Needs,
  ],
};

