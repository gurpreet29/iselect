import _ from 'lodash';

/**
 * MuleConnector loads needs questions, recommendations, intelligent experience and creation of lead data.
 */
class MuleConnector {

  constructor($http, muleRecommendationsApi, muleCaptureApi, addressApi) {
    this.$http = $http;
    this.recommendationsApi = muleRecommendationsApi;
    this.captureApi = muleCaptureApi;
    this.addressApi = addressApi;

  }

  GetQuestions(questionEndpoint) {
    return this.$http.get(questionEndpoint).then((response) => {

      return response.data;

    });
  }

  // GetRecommendationsForInitialQuote(initialQuoteAnswers) {
  //   var needsAnswers = _.map( initialQuoteAnswers, (value, name) => ({name,value}) );

  //     var httpConfig = {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': "application/json"
  //         },
  //         timeout: 30000,
  //         data: {
  //             "Action": "Recommendations",
  //             "needsData": needsAnswers
  //         },
  //         url: this.addressApi
  //     };
  //     return this.$http(httpConfig).then((response) => {
  //         if (response.status == 200) {
  //             return response.data;
  //         }
  //     }, function (response) {
  //         return response;
  //     });
  // }

  GetRecommendationsForInitialQuote(initialQuoteAnswers) {
    return this.$http.get(this.recommendationsApi).then((response) => {

      return response.data;

    });
  }


  CheckForCaptureStatus(initialQuoteAnswers) {
    return this.$http.get(this.captureApi).then((response) => {

      return response.data;
    });
    /*let verticalId = 'homecontents';
    var httpConfig = {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        data: {
            "needs": initialQuoteAnswers
        },
        url: this.captureApi
    };
    return this.$http(httpConfig).then((response) => {
        if (response.status == 200) {
            return response.data;
        }
    }, function (response) {
        return response;
    });*/
  }


  SendDummyResponse() {
    let res = undefined;
    res.results = [];
    res.captureDataFlag = true;
    return res;
  }
}

export default ['$http', 'muleRecommendationsApi', 'muleCaptureApi', MuleConnector];
