import view from './view.html';

class Features {
  constructor() {
    this.product = undefined;
    this.features = undefined;
  }

  getFeatureValue(feature) {
    const featureData = _.find(this.product.elements, (element) => element.name === feature.elemid);
    return featureData && featureData.value;
  }
}


export default {
  bindings: {
    product: '<',
    features: '<',
  },
  template: view,
  controller: [ Features ],
};
