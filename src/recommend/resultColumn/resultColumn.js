import view from './view.html';

class ResultColumn {
  constructor() {
    // Bindings
    this.product = undefined;
    this.paymentFrequency = undefined;
    this.headers = undefined;
    this.featureSuperset = undefined;
    this.featureSet = undefined;
    this.onApply = undefined;
    this.onCustomisePrice = undefined;
  }

  openCustomisePriceModal() {
    this.onCustomisePrice({
      $event: {
        productCode: this.product.productCode,
        quoteid: this.product.quoteId,
      }
    });
  }

  getPrice() {
    return _.find(this.product.pricingModel, (price) => price.name === this.paymentFrequency);
  }

  getFeatureValue(feature) {
    const featureData = _.find(this.product.elements, (element) => element.name === feature.elemid);
    return featureData && featureData.value;
  }


  // noinspection JSUnusedGlobalSymbols
  apply() {
    this.onApply({
      $event: {
        productCode: this.product.productCode,
        quoteId: this.product.quoteId,
      }
    })
  }
}

export default {
  bindings: {
    product: '<',
    paymentFrequency: '<',
    headers: '<',
    featureSuperset: '<',
    featureSet: '<',
    onApply: '&',
    onCustomisePrice: '&'

  },
  template: view,
  controller: [ ResultColumn ],
};
