/**
 * The root source for karma tests. Includes all JS files where the file name ends ```_test```.
 */

import 'angular';
import 'angular-mocks/angular-mocks';

(
  ((global) => {
    global.resolvePromises = () => {
      inject(($rootScope) => {
        $rootScope.$digest();
      })
    }

    global.resolveHttpPromises = () => {
      inject(($rootScope, $httpBackend) => {
        $httpBackend.flush();
        $rootScope.$digest();
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      })
    }

  // eslint-disable-next-line no-undef
  })(typeof window !== 'undefined' ? window : global)
);

const testsContext = require.context(".", true, /\.test\.js$/);
testsContext.keys().forEach(testsContext);


it('should run tests', () => {
});

