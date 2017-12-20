import view from './view.html';
import './local.less';


class CaptureModal {
  constructor(analytics) {
    this.analytics = analytics;

    this.form = undefined;
    this.userDetails = undefined;
    this.contactNumber = undefined;

    // Bindings
    this.dismiss = undefined;
    this.resolve = undefined;
    this.close = undefined;

    //scope
    this.answer = undefined;
    this.userDetails = undefined;

    this.analytics.stepChanged('capture');
  }

  $onInit() {
    this.captureType = this.resolve.captureType;
  }

  onClick() {
    this.updateUserDetails();
    this.answer = this.userDetails;
    this.postAnalytics(this.userDetails);

    this.close({$value: this.answer});
  }

  updateUserDetails() {
    // if contact number starts with 04, assign it to mobile number else consider as landline number
    if(this.contactNumber !== undefined) {
      if (this.contactNumber.startsWith("04"))
        this.userDetails.contact_mobile_number = this.contactNumber;
      else
        this.userDetails.contact_other_number = this.contactNumber;
    }
  }

  postAnalytics(userDetails) {
    this.analytics.inputCaptured('phoneNumber', userDetails.contact_mobile_number || userDetails.contact_other_number);
    this.analytics.inputCaptured('email', userDetails.contact_email);
  }
}

export default {
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  template: view,
  controller: [ 'analytics', CaptureModal ]
};
