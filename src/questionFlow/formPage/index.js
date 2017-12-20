import _ from 'lodash';
import view from './view.html';
import './local.less';

/**
 * FormPage is a logical grouping of questions in Salesforce. In the
 * digital channel it simply render's it's child questions.
 */

class FormPage {
  constructor() {

    // Bindings
    this.deviceType = undefined;
    this.answers = undefined;
    this.form = undefined;
    this.onAdded = undefined;
    this.onCompleted = undefined;
    this.onAnswersUpdated = undefined;

    // Scope
    this.childComponents = [];
    this.isActive = false;
  }

  $onInit() {
    this.onAdded({
      $event: {
        question: this
      }
    });
  }

  isVisible() {
    return this.isRelevant() && (this.isAnswered() || this.isActive);
  }

  isRelevant() {
    return this.form.visibility.test(this.answers);
  }

  isAnswered() {
    return this.form.isAnswered;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * childAdded is called by a child question when it is initialised.
   * The child passes a reference to itself. This allows the active question to be determined.
   */
  childAdded($event) {
    this.childComponents.push($event.question)
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * onChildAnswered is called when a child question is answered.
   * @param $event
   */
  childAnswered() {
    this.checkAllChildrenAnswered();
  }

  checkAllChildrenAnswered() {
    if (!this.shouldBeActiveNow()) {
      this.form.isAnswered = true;
      this.onCompleted();
    }
  }

  shouldBeActiveNow() {
    if (!this.isRelevant()) {
      return false;
    }

    this.isActive = this.setAnyChildActive();
    return this.isActive;
  }

  setAnyChildActive() {
    return _.some(this.childComponents, (child) => child.shouldBeActiveNow());
  }

  answersUpdated($event) {
    this.onAnswersUpdated({ $event });
  }
}


export default {

  bindings: {
    deviceType: '<',
    form: '<',
    answers: '<',
    onAdded: '&',
    onCompleted: '&',
    onAnswersUpdated: '&'
  },
  template: view,
  controller: [FormPage]
};
