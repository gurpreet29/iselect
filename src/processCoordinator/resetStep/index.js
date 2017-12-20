import view from './view.html';

class ResetStep {
  constructor() {
    // Bindings
    this.resolve = undefined;
    this.close = undefined;
    this.dismiss = undefined;

    // Scope
    this.currentStep = undefined;
    this.stepNumber = undefined;
    this.step = undefined;
    this.isActionable = undefined;
  }

  $onInit() {
    this.currentStep = this.resolve.currentStep;
    this.stepNumber = this.resolve.stepNumber;
    this.step = this.resolve.step;
    this.isActionable = this.currentStep >= this.stepNumber;
  }
}

export default {
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  template: view,
  controller: [ ResetStep ]
};
