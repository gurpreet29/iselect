import angular from 'angular';
import currencyLabelQuestion from './currencyLabelQuestion';
import services from '../../../services';


export default angular.module([services])
  .component('currencyLabelQuestion', currencyLabelQuestion)

  // end of config.
  .name;
