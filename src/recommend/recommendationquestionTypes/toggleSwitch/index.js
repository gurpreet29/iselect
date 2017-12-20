import angular from 'angular';
import toggleSwitch from './toggleSwitch';
import radioButton from 'angular-ui-bootstrap/src/buttons';


export default angular.module([radioButton])
  .component('toggleSwitch', toggleSwitch)

  // end of config.
  .name;
