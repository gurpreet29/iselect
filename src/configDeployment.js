/**
 * Configuration settings that may change per deployment.
 */
import config from './deployment.json';


export default (module) => {
  module
    .value('verticalCode', config.verticalCode)
    .value('verticalTitle', config.verticalTitle)
    .value('coreBaseUrl', config.coreBaseUrl)
    .value('addressApi', config.addressApi)
    .value('muleNeedsApi', config.muleNeedsApi)
    .value('muleRecommendationsApi', config.muleRecommendationsApi)
    .value('muleCaptureApi', config.muleCaptureApi)
    .value('muleLatestNeedsApi', config.muleLatestNeedsApi)

    .config(['$sceDelegateProvider', ($sce) => {
      $sce.resourceUrlWhitelist(
        [
          'self',
          config.coreBaseUrl
        ]
      );
    }])

  // end of configuration
  ;
}
