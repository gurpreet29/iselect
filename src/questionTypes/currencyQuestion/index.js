import angular from 'angular';
import currencyQuestion from './currencyQuestion';
import services from '../../services';


export default angular.module('iselect.vertical.questionType.currency', [services])
    .component('currencyQuestion', currencyQuestion)

    // end of config.
    .name;