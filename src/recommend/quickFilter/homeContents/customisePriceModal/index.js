import view from './view.html';

class CustomisePriceModalCtrl {
  constructor() {

    // Bindings
    this.dismiss = undefined;
    this.resolve = undefined;
    this.close = undefined;
    this.answers = [];
    this.deviceType = undefined;
    this.form = undefined;
    this.previousAnswers = [];

    //scope
    this.answer = undefined;
    this.userDetails = undefined;
  }

  $onInit() {
    this.questions = this.resolve.questions;
    this.needsAnswers = this.resolve.needsAnswer;
    this.out = 0;
    this.answers = _.clone(this.needsAnswers);
    this.setDefaultAnswers(this.questions);
  }

  setDefaultAnswers(qstns) {
    _.forEach(qstns, (qstn) => {
      if(qstn.id === 'payment_frequency' && !this.answers.hasOwnProperty(qstn.id))
        this.answers[qstn.id] = 'annualPremium';
    });
  }

  onUpdate() {
    this.close({$value: this.answers});
  }
}

export default {
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  template: view,
  controller: [ CustomisePriceModalCtrl ]
};
