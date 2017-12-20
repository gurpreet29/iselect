import angular from 'angular';
import resultColumn from './resultColumn';
import features from './features';


export default angular.module('iselect.vertical.resultColumn', [])

  .component('resultColumn', resultColumn)
  .component('features', features)

  // end of config.
  .name;