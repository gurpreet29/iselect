import view from './view.html';

class CustomisePriceQuestionTypeCtrl {
  constructor() {

    this.ruleValidatorContext = undefined;

    // Bindings
    this.question = undefined;
    this.answers = undefined;
    
    this.form = undefined;

    //scope
    this.answer = undefined;
    this.userDetails = undefined;
  }

  $onInit() {
    this.ruleValidatorContext = { questionId:  this.question.id,
      required:  this.question.required,
      validations:  this.question.validations,
      answers: this.answers};
  }

  isVisible(qstn) {
    return qstn.visibility.test(this.answers);
  }

  getValue(id) {
    var value = this.answers[id];
    return value;
  }

  getExcessValue(id) {
    var value;
    if(this.answers.hasOwnProperty(id))
      value = this.answers[id];
    else
      value = "500";
    return value;
  }

  getToggleValue(id) {
    var value;
    if(this.answers.hasOwnProperty(id))
      value = this.answers[id];
    else {
      value = "annualPremium";
      this.answers[id] = value;
    }
    return value;
  }
}

export default {
  bindings: {
    question: '<',
    answers: '<'
  },
  template: view,
  controller: [ CustomisePriceQuestionTypeCtrl ]
};
