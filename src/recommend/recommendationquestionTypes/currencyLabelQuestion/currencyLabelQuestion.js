import view from './view.html';
import './local.less';

class CurrencyLabelQuestion {
  constructor($log) {
    this.$log = $log;

    // Bindings
    this.onAnswered = undefined;
    this.answer = undefined;
    this.answers = undefined;
    this.question = undefined;
    this.ngDisabled = undefined;
  }

  $onInit() {
    this.ruleValidatorContext = {
      questionId: this.question.id,
      required: this.question.required,
      validations: this.question.validations,
      answers: this.answers,
    };
  }

  onClick() {
      this.answers[ this.question.id ] = this.answer;
  }

}

export default {
  bindings: {
    question: '<',
    answer: '<',
    answers: '<',
    ngDisabled: '<',
  },
  template: view,
  controller: ['$log', CurrencyLabelQuestion]
}
