import view from './view.html';


//TODO: This is not production ready!!!!
//Upgrade using TextQuestion or CurrencyQuestion

/**
 * A question that requires an address answer
 */
class numberSelectCtrl {
  constructor($log, addressReceiver) {
    this.$log = $log;
    this.addressReceiver = addressReceiver;

    // Bindings
    this.deviceType = undefined;
    this.question = undefined;
    this.answers = undefined;

    this.onValueGiven = undefined;
    this.totalNoOfOptions = undefined;
    this.checkedValue = -1;
    this.description = 'How many rooms are used for business ?';

    this.getQuestions();

    // Scope
    this.answer = null;
  }

  getQuestions() {
    this.questions = [
      { id: 1, questionName: 'Home Insurance', answer: 0, imageName: 'home-only.png' },
      { id: 2, questionName: 'Home and Contents Insurance', answer: 0, imageName: 'home-and-contents.png' },
      { id: 3, questionName: 'Contents Insurance', answer: 0, imageName: 'contents-only.png' },
      { id: 4, questionName: 'Landlord Insurance', answer: 0, imageName: 'landlord.png' },
    ];
  }

  toggleMode(val) {
    this.checkedValue = val;
  }

  isChecked(val) {
    if (this.checkedValue == val)
      return true;
    else
      return false;
  }
}

export default {
  bindings: {
    deviceType: '<',
    question: '<',
    onValueGiven: '&',
    answers: '<',
  },
  template: view,
  controller: [ '$log', 'addressReceiver', numberSelectCtrl ],
};
