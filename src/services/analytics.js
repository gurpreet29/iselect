import _ from 'lodash';

class Analytics {
  constructor($log, $window, verticalCode) {
    this.verticalCode = verticalCode;
    this.collector = window.iselect && window.iselect.analytics || {};
    this.collector.vertical = {
      name: verticalCode,
      section: "sales funnel"
    };
    this.collector[ this.verticalCode ] = {};

    $window._satellite = $window._satellite || { track: () => $log.debug('track', this.collector) };
    this.track = $window._satellite.track;
  }

  stepChanged(name) {
    this.collector.vertical.step = name;
    this.collector.vertical.action = 'page change';
    this.track('vertical-action');
  }

  stateCaptured(inputId, answer) {
    this.collector.vertical[ inputId ] = answer;
  }

  inputCaptured(inputId, answer) {
    this.collector[ this.verticalCode ][ inputId ] = answer;
  }

  productsShown(positionedProducts, model) {
    this.collector.vertical.products = _.reduce(
      positionedProducts,
      (acc, pp, index) => {
        acc[ `${index + 1}` ] = {
          product_supplier: pp.product.provider,
          product_name: pp.product.productName,
          product_position: pp.position + 1,
          sponsored: pp.product.sponsored || false,
        };

        return acc;
      },
      {}
    );

    this.collector.vertical.resulttype = model;
    this.collector.vertical.action = 'products loaded';
    this.track('vertical-action');
  }

  productSelected(product, position) {
    this.collector.vertical.selectedProduct = {
      product_supplier: product.provider,
      product_name: product.productName,
      product_position: `${position}`,
      sponsored: product.sponsored || false,
    };

    this.collector.vertical.action = 'apply now click';
    this.track('vertical-action');
  }
}

export default [ '$log', '$window', 'verticalCode', Analytics ];