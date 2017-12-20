/**
 */

import angular from 'angular';
import questionParser from './questionsParser';
import addressReceiverService from './addressReceiver.service';
import imageLoader from './imageLoader.service';
import questionEvaluator from './questionEvaluator';
import muleConnector from './muleConnector.service';
import guid from './guid';
import captureManager from './captureManager';
import scroller from './scroller';
import deviceType from './deviceType';
import analytics from './analytics';

export default angular.module('iselect.vertical.services', [])
  .service('questionParser', questionParser)
  .service('addressReceiver', addressReceiverService)
  .service('imageLoader', imageLoader)
  .service('questionEvaluator', questionEvaluator)
  .service('muleConnector', muleConnector)
  .service('guid', guid)
  .service('captureManager', captureManager)
  .service('scroller', scroller)
  .service('deviceType', deviceType)
  .service('analytics', analytics)

  // end of config
  .name;
