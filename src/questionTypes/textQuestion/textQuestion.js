import { BaseQuestion } from "../baseQuestion";
import view from './view.html';

/**
 * A question that requires a free text answer
 */
class TextQuestion extends BaseQuestion {
  constructor() {
    super();
  }

  $postLink() {
    this.initialise();
  }

  answered() {
    this.submit(this.answer);
  }
}

export default {
  bindings: {
    deviceType: '<',
    question: '<',
    ruleValidatorContext: '<',
    onAnswered: '&',
    answers: '<'
  },
  template: view,
  controller: [TextQuestion]
}
