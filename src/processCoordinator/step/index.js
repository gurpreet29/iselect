import view from './view.html';

class Step {
  constructor($location) {
    this.$location = $location;

    // Bindings
    this.currentStep = undefined;
    this.stepNumber = undefined;
    this.changeStep = undefined;
  }

  stepActive() {
    return (this.stepNumber === this.currentStep);
  }

  gotoStep() {
    this.changeStep({
      $event: {
        step: this.stepNumber
      }
    });
  }

}

export default [
  () => ({
    restrict: 'A',
    scope: {
      currentStep: '<',
      stepNumber: '<',
      changeStep: '&'
    },
    template: view,
    transclude: true,
    controllerAs: '$ctrl',
    bindToController: true,
    controller: [ '$location', Step ]
  })
];
