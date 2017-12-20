import angular from 'angular';
import _ from 'lodash';
import view from './view.html';
import './local.less';

/**
 * QuestionSet is responsible for retrieving the set of questions from an external resources
 * and then creating repeating questions using this information.
 *
 * It creates a question per element. Note that questions can be nested or sections.
 *
 * It also responds to client resize actions to allow child questions to reformat.
 */
class QuestionSet {

  constructor($window, $element, $timeout, muleConnector, questionsParser, questionEvaluator, scroller, deviceType) {
    this.$window = $window;
    this.$element = $element;
    this.$timeout = $timeout;
    this.muleConnector = muleConnector;
    this.questionParser = questionsParser;
    this.questionEvaluator = questionEvaluator;
    this.scroller = scroller;
    this.deviceType = deviceType;

    // Bindings
    this.promisedQuestions = undefined;
    this.answers = undefined;
    this.doneMessage = undefined;
    this.btnMessage = undefined;
    this.postconditionsMet = undefined;
    this.onAnswersUpdated = undefined;
    this.onAllAnswered = undefined;
    this.onQuestionsFinalised = undefined;

    // Scope
    this.questions = undefined;
    this.childComponents = [];
    this.totalRelevantQuestions = 0;
    this.totalAnsweredQuestions = 0;
    this.stillAskingQuestions = true;
  }

  $onInit() {
    this.promisedQuestions.then((questions) => {
      this.questions = questions;

      // After digest
      this.$timeout(() => {
        this.progressActiveQuestion();
        this.updateProgressBar();
      }, 0);
    });
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * childAdded is called by a child question when it is initialised.
   * The child passes a reference to itself. This allows the active question to be determined.
   */
  childAdded($event) {
    this.childComponents.push($event.question);
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * childAnswered progresses the question flow to the next question.
   */
  childAnswered() {
    this.progressActiveQuestion();
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * answersUpdated for every answer given to a question.
   * @param $event
   */
  answersUpdated($event) {
    this.onAnswersUpdated({ $event });
    this.updateProgressBar();
  }

  updateProgressBar() {
    (
      {
        relevant: this.totalRelevantQuestions,
        answered: this.totalAnsweredQuestions
      } = this.questionEvaluator.calculateProgress(this.questions, this.answers)
    );
  }

  progressActiveQuestion() {
    this.stillAskingQuestions = this.setAnyChildActive();

    if (!this.stillAskingQuestions) {
      this.scroller.scrollTo(document.getElementById('questionsDone'));
      this.onAllAnswered();
    }
  }

  setAnyChildActive() {
    return _.some(this.childComponents, (child) => child.shouldBeActiveNow());
  }

  questionsFinalised() {
    this.onQuestionsFinalised();
  }
}


export default {
  transclude: true,
  bindings: {
    promisedQuestions: '<',
    answers: '<',
    doneMessage: '<',
    btnMessage: '<',
    postconditionsMet: '<',
    onAnswersUpdated: '&',
    onAllAnswered: '&',
    onQuestionsFinalised: '&'
  },
  template: view,
  controller: [
    '$window',
    '$element',
    '$timeout',
    'muleConnector',
    'questionParser',
    'questionEvaluator',
    'scroller',
    'deviceType',
    QuestionSet,
  ],
};


