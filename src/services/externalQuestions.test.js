import mod from './index';

xdescribe('externalQuestions', () => {
  let sut;
  let $httpBackend;

  const apiEndpoint = 'http://somequestions.com/needsSchema/';

  beforeEach(() => {
    angular.mock.module(mod);
    angular.mock.module(($provide) => {
      $provide.constant('needsApi', apiEndpoint);
    })

  });

  beforeEach(
    inject((_$httpBackend_) => {
      $httpBackend = _$httpBackend_;
    })
  );

  beforeEach(
    inject((externalQuestions) => {
      sut = externalQuestions;
    })
  );

  describe('get', () => {

    it('will request the questions from the configured API', (done) => {
      const expected = {dummyResponse: true};

      $httpBackend.when('GET', apiEndpoint).respond(expected);

      const promisedActual = sut.get(apiEndpoint);

      promisedActual.then((actual) => {
        expect(actual.data).toEqual(expected);
        return done();
      });

      resolveHttpPromises();
    });
  })

});