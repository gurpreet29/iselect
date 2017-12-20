import angular from 'angular';
import labelQuestion from './labelQuestion';
import services from '../../services';


export default angular.module('iselect.vertical.questionType.label', [services])
    .component('labelQuestion', labelQuestion)

    // end of config.
    .name;