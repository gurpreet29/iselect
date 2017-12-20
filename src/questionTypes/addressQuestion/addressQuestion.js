import { BaseQuestion } from '../baseQuestion';
import view from './view.html';
import './local.less';
import _ from 'lodash';

/**
 * A question that requires an address answer
 */
class AddressQuestion extends BaseQuestion {
  constructor(addressReceiver) {
    super();

    this.addressReceiver = addressReceiver;

    // Getter/setter
    this._pickedAddress = undefined;

    // Used to indicate the final address match that is selected for manually addressing
    this.noMatch = { noMatch: true };

    // Scope
    this.manualAddressDetails = undefined;
    this.formLookup = undefined;
    this.formManual = undefined;
    // noinspection JSUnusedGlobalSymbols
    this.loadingAddresses = false;
  }

  $onInit() {
  }

  // noinspection JSUnusedGlobalSymbols
  $postLink() {
    this.formLookup.addressLookup.$formatters.push(this.getFullAddress); // Pushed rather than unshifted
    this.initialise();
  }

  getFullAddress(maybeStructuredAddress) {
    return maybeStructuredAddress && maybeStructuredAddress.fullAddress || null;
  }

  switchToManualAddressMode(manual) {
    this.manualAddress = manual;
    this.form.$setPristine();
    this.clearManualAddress();
  }

  clearManualAddress() {
    this.manualAddressDetails = {
      unitNumberEntered: undefined,
      streetNoEntered: undefined,
      streetNameEntered: undefined,
      selectedStreetType: undefined,
      suburbSelected: undefined,
      country: undefined,
    }
  }

  getLocation(val) {
    const addressList = this.addressReceiver.getAddressList(val);
    return addressList.then((list) => {
      // To force the no match link into the dropdown we fake the last item. See custom template.
      list.push(this.noMatch);
      return list;
    });
  }

  // noinspection JSUnusedGlobalSymbols
  getStreetTypes(val) {
    return _.filter(this.addressReceiver.getStreetTypes(), (type) => _.startsWith(type.toLowerCase(), val.toLowerCase()));
  }

  // noinspection JSUnusedGlobalSymbols
  getPostCodes(val) {
    return this.addressReceiver.getPostCodes(val);
  }

  addressSelected() {
    this.formLookup.addressLookup.$setValidity('address', (!!(this.pickedAddress() && this.pickedAddress().id) || !this.pickedAddress()));
  }

  /** pickedAddress is the getterSetter for the address lookup control.
   * We use this to allow interception of the noMatch selection.
   * @param value
   * @returns {*}
   */
  pickedAddress(value) {
    if (!arguments.length) {
      return this._pickedAddress;
    }

    if (value === this.noMatch) {
      this.switchToManualAddressMode(true);
      return (this._pickedAddress = undefined);
    }

    return this._pickedAddress = value;
  }

  lookupPicked() {
    this.addressSelected();
    this.formLookup.$setSubmitted();
    this.submit(this.pickedAddress());
  }

  manuallyAddressed() {
    this.formManual.$setSubmitted();
    this.submit(this.convertManualToStructuredAddress());
  }

  convertManualToStructuredAddress() {
    return {
      flatUnitNumber: this.manualAddressDetails.unitNumberEntered,
      streetNumber: this.manualAddressDetails.streetNoEntered,
      street: this.manualAddressDetails.streetNameEntered,
      streetType: this.manualAddressDetails.selectedStreetType,
      state: this.manualAddressDetails.suburbSelected && this.manualAddressDetails.suburbSelected.state,
      postcode: this.manualAddressDetails.suburbSelected && this.manualAddressDetails.suburbSelected.postcode,
      locality: this.manualAddressDetails.suburbSelected && this.manualAddressDetails.suburbSelected.locality,
    };
  }

  restoreAnswer() {
    const structuredAddress = this.answers[ `${this.question.id}_structuredAddress` ];

    // Is there a structured address?
    if(structuredAddress && structuredAddress.id) {
      this.switchToManualAddressMode(false);
      this.pickedAddress(structuredAddress);
      this.clearManualAddress();

      return true;
    } else {
      // Is there a manually entered address?
      if(this.answers[ `${this.question.id}_postcode` ]) {
        this.switchToManualAddressMode(true);
        this.manualAddressDetails.unitNumberEntered = this.answers[ `${this.question.id}_unit` ];
        this.manualAddressDetails.streetNoEntered = this.answers[ `${this.question.id}_streetnumber` ];
        this.manualAddressDetails.streetNameEntered = this.answers[ `${this.question.id}_street` ];
        this.manualAddressDetails.selectedStreetType = this.answers[ `${this.question.id}_street_type` ];
        this.manualAddressDetails.suburbSelected = {
          state: this.answers[ `${this.question.id}_state` ],
          postcode: this.answers[ `${this.question.id}_postcode` ],
          locality: this.answers[ `${this.question.id}_suburb` ],
        };

        return true;
      } else {
        return false;
      }
    }
  }

  setAnswer(address = {}) {
    this.answers[ `${this.question.id}_structuredAddress` ] = address;
    this.answers[ `${this.question.id}_suburb` ] = address.locality;
    this.answers[ `${this.question.id}_postcode` ] = address.postcode;
    this.answers[ `${this.question.id}_state` ] = address.state;
    this.answers[ `${this.question.id}_street` ] = address.street;
    this.answers[ `${this.question.id}_street_type` ] = address.streetType;
    this.answers[ `${this.question.id}_streetnumber` ] = address.streetNumber;
    this.answers[ `${this.question.id}_unit` ] = address.flatUnitNumber;
    this.answers[ `${this.question.id}_gnafpid` ] = address.id;
    this.answers[ `${this.question.id}_country` ] = 'Australia';
  }
}

export default {
  bindings: {
    deviceType: '<',
    question: '<',
    ruleValidatorContext: '<',
    onAnswered: '&',
    answers: '<',
  },
  template: view,
  controller: [ 'addressReceiver', AddressQuestion ],
};
