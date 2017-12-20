import angular from 'angular';
import pickListLabelQuestion from './pickListLabelQuestion';
import services from '../../../services';


export default angular.module([services])
  .component('pickListLabelQuestion', pickListLabelQuestion)

  // end of config.
  .name;
