import { BaseQuestion } from "../baseQuestion";
import _ from 'lodash';
import view from './view.html';
import './local.less';

/**
 * A question that requires a lookup answer
 */
class LookupQuestion extends BaseQuestion {
  constructor() {
    super();

    // Scope
    this.answer = undefined;
    // noinspection JSUnusedGlobalSymbols
    this.noResults = false;
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

    if (viewValue && viewValue.key) {
      return viewValue.key;
    }

    let maybeAnOption = _.find(this.question.options, (opt) => opt.key === viewValue);
    if (maybeAnOption) {
      return maybeAnOption.key;
    }

    return undefined;
  }

  hasNonParseErrors() {
    return this.hasErrors(this.form.lookup) && (!this.form.lookup.$error.parse || this.noResults)
  }

  // noinspection JSUnusedGlobalSymbols
  selected() {
    // Picking directly from the lookup short-circuits the model parse!?!?
    this.answer = this.parseLookup(this.answer);
    this.onSubmitted();
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
  controller: [ LookupQuestion ],
};
