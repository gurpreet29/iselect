import { BaseQuestion } from "../baseQuestion";
import view from './view.html';
import './local.less';

/**
 * A question that requires a single select
 */
class SingleSelectQuestion extends BaseQuestion {
  constructor($log, imageLoader) {
    super();

    this.$log = $log;
    this.imageLoader = imageLoader;
    }

  $postLink() {
    this.initialise();
  }

  chosen() {
    this.submit(this.answer);
  }

  isChecked(val) {
    return this.answer === val;
  }

  loadImage(imageName) {
    this.image = this.imageLoader.getImage(imageName);
    return this.image;
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
    controller: ['$log', 'imageLoader', SingleSelectQuestion]
};
