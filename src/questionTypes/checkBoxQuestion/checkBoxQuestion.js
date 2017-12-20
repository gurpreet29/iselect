import { BaseQuestion } from "../baseQuestion";
import _ from 'lodash';
import view from './view.html';
import './local.less';

const ANSWER_SEPARATOR = ',';

class CheckBoxQuestion extends BaseQuestion {
  constructor() {
    super();

    // Scope
    this.answer = undefined;
    this.optionPrefix = 'opt_';
  }

  // noinspection JSUnusedGlobalSymbols
  $postLink() {
    this.initialise();
  }

  getModel(option) {
    return `${this.optionPrefix}${option.key}`;
  }

  isChecked(option) {
    return this.answer && this.answer[ this.getModel(option) ];
  }

  submitted() {
    this.form.$setValidity('required', (!this.question.required || _.some(this.answer, (opt) => opt)), this.form);
    this.submit(this.answer);
  }

  restoreAnswer() {
    const priorAnswer = this.answers[ this.question.id ];

    if (priorAnswer) {
      const previouslyChecked = _.split(priorAnswer, ANSWER_SEPARATOR);
      this.answer = _.reduce(
        this.question.options,
        (acc, option) => {
          acc[ this.getModel(option) ] = _.some(previouslyChecked, (checked) => checked === option.key);
          return acc;
        },
        {});

      return true;
    }

    this.answer = _.reduce(
      this.question.options,
      (acc, option) => {
        acc[ this.getModel(option) ] = option.isdefault;
        return acc;
      },
      {});

    return false;
  }

  setAnswer(answer) {
    const selectKeysArray =
      _.transform(
        answer,
        (acc, isSet, key) => {
          isSet ? acc.push(key.substring(this.optionPrefix.length)) : acc;
          return acc;
        },
        []);


    this.answers[ this.question.id ] = _.join(selectKeysArray, ANSWER_SEPARATOR);
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
  controller: [ '$log', CheckBoxQuestion ],
};
