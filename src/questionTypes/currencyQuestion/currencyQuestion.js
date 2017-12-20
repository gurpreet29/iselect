import { BaseQuestion } from '../baseQuestion';
import view from './view.html';
import './local.less';

class CurrencyQuestion extends BaseQuestion {
  constructor() {
    super();

    // Scope
    this.answer = undefined;
  }

  // noinspection JSUnusedGlobalSymbols
  $postLink() {
    this.initialise();
  }

  submitted() {
    this.submit(this.answer);
  }
}

export default {
  bindings: {
    deviceType: '<',
    question: '<',
    ruleValidatorContext: '<',
    onAnswered: '&',
    answers: '<',
  },
  template: view,
  controller: [ CurrencyQuestion ],
};
