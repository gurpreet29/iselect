import './local.less';

class ToggleSwitchCtrl {
  constructor() {

    // Bindings
    this.question = undefined;
    this.answer = undefined;
    this.answers = undefined;
    this.onToggled = undefined;

  }
  $onInit() {
    this.setAnswer();
  }

  chosen(key) {
    this.setAnswer();
    this.onToggled({
      $event: {
        question: this.question.id,
        answer: this.answer,
      },
    });
  }

  setAnswer() {
    this.answers[this.question.id] = this.answer;
  }

  isChecked(key) {
    if(this.answer == key)
      return true;
    else
      return false;
  }

}

export default {
  bindings: {
    question: '<',
    answers: '<',
    answer: '<',
    onToggled: '&'
  },
  template: require('./view.html'),
  controller: [ToggleSwitchCtrl]
};
