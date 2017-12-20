import { BaseQuestion } from "../baseQuestion";
import view from './view.html';
import './local.less';

class RankSelectQuestion extends BaseQuestion {
  constructor() {
    super();

    // Scope
    this.answer = undefined;
  }

  // noinspection JSUnusedGlobalSymbols
  $postLink() {
    this.initialise();
  }

  change() {
    this.form.$setValidity('required', (!this.question.required || this.answer), this.form);
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
        answer: '<'
    },
    template: view,
    controller: ['$log', RankSelectQuestion]
};
