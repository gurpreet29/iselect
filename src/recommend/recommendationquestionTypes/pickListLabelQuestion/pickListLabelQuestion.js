import view from './view.html';
import './local.less';

class PickListLabelQuestion {
  constructor($log) {
    this.$log = $log;

    // Bindings
    this.answers = undefined;
    this.answer = undefined;
    this.question = undefined;
    this.selectedValue = "500";
  }

  $onInit() {
    this.selectedValue = this.answer;
  }

  onClick() {
    this.answers[ this.question.id ] = this.answer;
  }
}

export default {
  bindings: {
    question: '<',
    answer: '<',
    answers: '<'
  },
  template: view,
  controller: ['$log', PickListLabelQuestion]
}
