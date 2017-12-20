import _ from 'lodash';
import view from './view.html';

export default [
  () => ({
    restrict: 'E',
    scope: {
      control: '=',
      context: '=',
    },
    template: view,
    link: (scope, elm, attr, ctrl) => {
    }
  })
]
