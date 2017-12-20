import _ from 'lodash';
import { BaseQuestion } from "../baseQuestion";
import view from './view.html';

class PickListQuestion extends BaseQuestion {
  constructor() {
    super();
  }

  // noinspection JSUnusedGlobalSymbols
  $postLink() {
    this.form.lookup.$formatters.unshift((value) => this.formatLookup(value));
    this.form.lookup.$parsers.push((value) => this.parseLookup(value));

    this.initialise();
  }

  formatLookup(modelValue) {
    return (modelValue && _.find(this.question.options, (opt) => opt.key === modelValue).value) || null;
  }

  parseLookup(viewValue) {
    if (!viewValue) {
      return null;
    }

    if (viewValue.key) {
      return viewValue.key;
    }

    let maybeAnOption = _.find(this.question.options, (opt) => opt.key === viewValue);
    if (maybeAnOption) {
      return maybeAnOption.key;
    }

    return undefined;
  }

  // noinspection JSUnusedGlobalSymbols
  changed() {
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
  controller: [ PickListQuestion ],
};
