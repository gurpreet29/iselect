import addressQuestion from './addressQuestion';

describe('AddressQuestionCtrl', () => {

    beforeEach(
        inject(($log, addressReceiver) => {
        this.$log = $log;
        this.addressReceiver = addressReceiver;
    })
    );

    describe('getLocation', () => {

        beforeEach(inject((addressReceiver) => {
            spyOn(addressReceiver, 'getLocation').and.callFake(function() {
                return {
                    then: function(successCallback, errorCallback) {
                        if (flag === 'success') successCallback(listOfTestUsers);
                        else errorCallback("Error");
                    }
                }
            });
        }));

        it('call address service and get the address', () => {
            let inputvalue = '294 bay rd';
            let expected = {};

            const actual = this.addressReceiver.getLocation(inputvalue);

            expect(actual[1]).toEqual();
        });

        it('call address service and redirects to manual entry if input address is not found', () => {
            let inputvalue = '2944 bayyy rdd';
            let expected = {};

            const actual = this.addressReceiver.getLocation(inputvalue);

            expect(actual[1]).toEqual();
        });

    });



});