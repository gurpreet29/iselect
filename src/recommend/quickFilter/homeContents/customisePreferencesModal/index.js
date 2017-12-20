import view from './view.html';
import './local.less';

class CustomisePreferencesModalCtrl {
  constructor() {

    // Bindings
    this.dismiss = undefined;
    this.resolve = undefined;
    this.close = undefined;
    this.answers = [];
    this.deviceType = undefined;
    this.ruleValidatorContext = undefined;
    this.form = undefined;

    //scope
    this.answer = undefined;
    this.userDetails = undefined;
    this.ruleValidatorContext = {};
  }

  $onInit() {
    this.questions = this.resolve.questions;
    this.needsAnswers = this.resolve.needsAnswer;
    this.out = 0;
    this.ruleValidatorContext = {};
  }

  isVisible(qstn) {
    return qstn.visibility.test(this.needsAnswers);
  }

  getValue(id) {
    var value = this.needsAnswers[id];
    return value;
  }

  onUpdate() {
    this.close({$value: this.answers});
  }
}

export default {
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  template: view,
  controller: [ CustomisePreferencesModalCtrl ]
};
