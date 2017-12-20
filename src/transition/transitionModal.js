import view from './view.html';
import './local.less';


class TransitionModel {
  constructor(connector, verticalState) {
    this.connector = connector;
    this.verticalState = verticalState;

    // Bindings
    this.dismiss = undefined;
    this.resolve = undefined;
    this.close = undefined;
    this.quote = undefined;

    // Scope
    this.form = undefined;
    this.userDetails = this.verticalState.capture.userDetails;
    this.phoneNumber = undefined;
    this.hasTransitioned = false;
  }

  $onInit() {
    this.phoneNumber = this.userDetails.contact_mobile_number || this.userDetails.contact_other_number;
  }

  hasErrors(control) {
    return (
      (control && (control.$dirty || this.form.$submitted) && control.$invalid) ||
      (!control && this.form.$invalid));
  }

  onCallBack() {
    if (this.hasErrors()) {
      return;
    }

    this.updatePhoneNumberToContactDetails();
    this.hasTransitioned = true;
    this.createLead(this.userDetails);
  }

  updatePhoneNumberToContactDetails() {
    // if contact number starts with 04, assign it to mobile number else consider as landline number
    if (this.phoneNumber && this.phoneNumber.startsWith("04")) {
      this.userDetails.contact_mobile_number = this.phoneNumber;
    } else {
      this.userDetails.contact_other_number = this.phoneNumber;
    }
  }

  createLead(captureAnswers) {
    // TODO pass product code and quote id (this.quote) in this call?
    this.connector.sendUserDetailsToLeadAPI(this.verticalState.answers, captureAnswers)
      .then((response) => this.receivedLeadResponse(response));
  }

  receivedLeadResponse(data) {
  }

  // noinspection JSUnusedGlobalSymbols
  done() {
    this.close();
  }
}

export default {
  bindings: {
    close: '&',
    dismiss: '&',
    quote: '<',
  },
  template: view,
  controller: [ 'muleConnector', 'verticalState', TransitionModel ]
};
