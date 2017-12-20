import view from './view.html';

class QuickFilter {
  constructor() {

    // Bindings
    this.verticalCode = undefined;
    this.recQuestions = undefined;
    this.needsAnswers = undefined;
    this.onUpdated = undefined;
    this.onUpdatePaymentFrequency = undefined;
  }

  updatedExcess($event) {
    this.onUpdated({
      $event: {
        answers: $event.answers,
      },
    });
  }

  updatedPaymentFrequency($event) {
    this.onUpdatePaymentFrequency({
      $event: {
        question: $event.question,
        answer: $event.answer,
      },
    });
  }
}

export default {
  bindings: {
    vertical: '<',
    recQuestions: '<',
    needsAnswers: '<',
    paymentFrequency: '<',
    onUpdated: '&',
    onUpdatePaymentFrequency: '&'
  },
  template: view,
  controller: [ QuickFilter ]
};
