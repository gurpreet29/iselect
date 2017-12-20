import view from './view.html';

class LabelQuestion {
  constructor() {
    // Bindings
    this.deviceType = undefined;
    this.question = undefined;
    this.onAnswered = undefined;
  }
}

export default {
  bindings: {
    deviceType: '<',
    question: '<',
    onAnswered: '&',
  },
  template: view,
  controller: [LabelQuestion]
}
