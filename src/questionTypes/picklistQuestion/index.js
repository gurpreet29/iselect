import angular from 'angular';
import pickListQuestion from './picklistQuestion';
import services from '../../services';


export default angular.module([services])
    .component('pickListQuestion', pickListQuestion)

    // end of config.
    .name;