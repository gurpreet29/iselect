/**
 * Vendor libraries
 */
import angular from 'angular';
import ngSanitize from 'angular-sanitize';
import ngAnimate from 'angular-animate';
import ngTouch from 'angular-touch';

/**
 * Site-wide Styles
 */
import './styles/app.less';


/**
 * Modules
 */
import core from './coreResources';
import error from './error';
import services from './services';
import filters from './filters';
import questionFlow from './questionFlow';
import processCoordinator from './processCoordinator';

const module = angular
  .module('iselect.vertical', [
    ngAnimate,
    ngSanitize,
    ngTouch,
    core,
    error,
    services,
    filters,
    questionFlow,
    processCoordinator,
  ]);

// end of config


/**
 * Configure the application per deployment
 */
import configureDeployment from './configDeployment';
configureDeployment(module);

export default module.name;
