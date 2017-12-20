/**
 * AddressReceiver loads list of address from a remote endpoint
 */
class AddressReceiver {
  constructor($http, addressApi) {
    this.$http = $http;
    this.addressApi = addressApi;
  }

  // getAddressList(val) {
  //     var httpConfig = {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': "application/json"
  //         },
  //         timeout: 30000,
  //         data: {
  //             "Action": "PredictiveAddress",
  //             "AddressLine": val
  //         },
  //         url: this.addressApi
  //     };
  //     return this.$http(httpConfig).then((response) => {
  //         if(response.status == 200) {
  //             return response.data.payload.slice(0,10);
  //         }
  //     }, function (response) {
  //         return response;
  //     });
  // }

  getAddressList() {
    return this.$http.get(this.addressApi).then((response) => {

      return response.data.payload.slice(0, 10);
      // response.data; 
      // console.log('response.data' ,  JSON.stringify(response.data));
      // console.log('response' ,  JSON.stringify(response));
    });
  }

  getPostCodes(val) {
    var httpConfig = {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      timeout: 30000,
      data: {
        "Action": "PredictivePostcode",
        "AddressLine": val
      },
      url: this.addressApi
    };
    return this.$http(httpConfig).then(function(response) {
      if (response.status == 200) {
        return response.data.payload.slice(0, 10);
      }
    }, function(response) {
      return response;
    });
  }

  getStreetTypes() {
    this.streetTypes = ['Alley', 'Arcade', 'Avenue', 'Boulevard', 'Bypass', 'Circuit', 'Close',
      'Corner', 'Court', 'Crescent', 'Cul-de-sac', 'Drive', 'Esplanade', 'Green', 'Grove', 'Highway',
      'Junction', 'Lane', 'Link', 'Mews', 'Parade', 'Place', 'Ridge', 'Road', 'Square', 'Street',
      'Terrace'
    ];
    return this.streetTypes;
  }
}

export default ['$http', 'addressApi', AddressReceiver];
