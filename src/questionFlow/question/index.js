import _ from 'lodash';
import view from './view.html';
import './local.less';

const ACTIVE_QUESTION_SCROLL_DELAY = 500;
const ACTIVE_QUESTION_SCROLL_DURATION = 1000;

/**
 * Question determines which question type to display to the user.
 * Driven by a ng-switch in the view.
 */
class Question {
  constructor($element, $timeout, imageLoader, scroller, questionTracker) {
    this.$element = $element;
    this.$timeout = $timeout;
    this.imageLoader = imageLoader;
    this.scroller = scroller;
    this.questionTracker = questionTracker;

    // Bindings
    this.deviceType = undefined;
    this.question = undefined;
    this.questionLevel = undefined;
    this.answers = undefined;
    this.onAdded = undefined;
    this.onCompleted = undefined;
    this.onAnswersUpdated = undefined;

    // Scope
    this.ruleValidatorContext = undefined;
    this.childComponents = [];
    this.isActive = false;
    this.form = undefined;
    this.displayMask = false;
    this.showTipBox = false;
  }

  $onInit() {
    this.ruleValidatorContext = {
      questionId: this.question.id,
      required: this.question.required,
      validations: this.question.validations,
      answers: this.answers,
    };

    this.onAdded({
      $event: {
        question: this,
      },
    });
  }

  mainQuestion() {
    return this.questionLevel === 'main';
  }

  subQuestion() {
    return this.questionLevel === 'sub';
  }

  hasChildQuestions() {
    return this.question.children.length > 0;
  }

  hasErrors() {
    return (this.form.$dirty || this.form.$submitted) && this.form.$invalid;
  }

  isValid() {
    return this.form.$valid && !this.form.$pristine;
  }

  isVisible() {
    return this.isRelevant() && (this.hasErrors() || this.isAnswered() || this.isActive);
  }

  isRelevant() {
    return this.question.visibility.test(this.answers);
  }

  isAnswered() {
    return this.question.isAnswered;
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
   * onChildAnswered tells the parent of this that we are complete
   * when all child questions are answered.
   */
  childAnswered() {
    this.checkThisAndChildrenAnswered();
  }

  /**
   * answered takes a value provided by a user to a questionType component and
   * updates the answers.
   */
  answered($event) {
    this.question.isAnswered = this.isValid();

    if (this.isAnswered()) {
      this.onAnswersUpdated({
        $event: {
          question: this.question,
          answer: $event.answer
        }
      });
    }

    this.checkThisAndChildrenAnswered();
  }

  checkThisAndChildrenAnswered() {
    const isActive = this.determineActiveState();
    if (!isActive) {
      this.onCompleted();
    }
  }

  editingAnswer() {
    this.displayMask = false;
    this.question.isAnswered = false;
    this.shouldBeActiveNow(0);
  }

  determineActiveState() {
    const anyChildActive = this.setAnyChildActive(); // Always evaluate. Do not short-circuit.
    this.isActive = this.isRelevant() && (!this.isAnswered() || anyChildActive);

    this.displayMask = this.isAnswered() && !anyChildActive;
    this.considerThisAutoAnswered();

    if (this.isActive) {
      // After digest cycle focus to end of question.
      this.$timeout(() => {
        const inputs = this.$element.find('input') || this.$element.find('button');
        if (inputs.length > 0) {
          inputs[0].focus();
        }
      }, ACTIVE_QUESTION_SCROLL_DELAY);
    }

    return this.isActive;
  }

  shouldBeActiveNow(scrollDelay = ACTIVE_QUESTION_SCROLL_DELAY) {
    const active = this.determineActiveState();

    if (!this.hasChildQuestions() && active) {
      this.questionTracker.becameActive(
        this, () => this.scroller.scrollTo(this.$element, ACTIVE_QUESTION_SCROLL_DURATION, scrollDelay)
      );
    }

    return active;
  }

  considerThisAutoAnswered() {
    if (this.question.type === 'label') {
      this.question.isAnswered = true;
    }
  }

  setAnyChildActive() {
    return _.reduce(
      this.childComponents,
      (someActive, child) => child.shouldBeActiveNow() || someActive,
      false);
  }

  loadEditImage() {
    this.image = this.imageLoader.getEditImage();
    return this.image;
  }

  // noinspection JSUnusedGlobalSymbols
  answersUpdated($event) {
    this.onAnswersUpdated({ $event });
  }
}


export default {

  bindings: {
    deviceType: '<',
    question: '<',
    questionLevel: '<',
    answers: '<',
    onAdded: '&',
    onCompleted: '&',
    onAnswersUpdated: '&'
  },
  template: view,
  controller: [ '$element', '$timeout', 'imageLoader', 'scroller', 'questionTracker', Question ]
};
