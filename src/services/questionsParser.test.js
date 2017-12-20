import mod from './index';

describe('questionParser', () => {
  let sut;

  beforeEach(angular.mock.module(mod));

  beforeEach(
    inject((questionParser) => {
      sut = questionParser;
    })
  );


  describe('transformOptions', () => {

    [
      'picklist',
      'toggle-button-group',
      'icon-button-group'
    ].forEach(
      (elemType) => {
        it(`should return options for an element type of ${elemType}`, () => {
          const raw = {
            digitaltype: elemType,
            options: ['a']
          };

          expect(sut.constructor.transformOptions(raw)).toEqual(
            {
              options: ['a']
            });
        });
      }
    );

    [
      'form-important-note',
      'form-page',
      'form-page-section',
      'address-lookup',
      'checkbox',
      'text',
      'currency'
    ].forEach(
      (elemType) => {
        it(`should return no options for an element type of ${elemType}`, () => {
          const raw = {
            elemtype: elemType,
            options: ['a']
          };

          expect(sut.constructor.transformOptions(raw)).toEqual({});
        });
      }
    );

  });


  describe('transformValidations', () => {

    it('should emit an empty array for missing validations', () => {
      const raw = undefined;

      const actual = sut.constructor.transformValidations(raw);

      expect(actual).toEqual([]);
    });

    it('should emit an empty array for empty validations', () => {
      const raw = [];

      const actual = sut.constructor.transformValidations(raw);

      expect(actual).toEqual([]);
    });

    it('should emit a set of validations', () => {
      const raw = [
        {
          elemid: 'abc',
          error_msg: 'one'
        },
        {
          elemid: 'def',
          error_msg: 'two'
        },
        {
          elemid: 'ghi',
          error_msg: 'three'
        }
      ];

      const actual = sut.constructor.transformValidations(raw);

      expect(actual).toEqual([
        {
          id: 'abc',
          errorMsg: 'one',
          rule: jasmine.any(Object)
        },
        {
          id: 'def',
          errorMsg: 'two',
          rule: jasmine.any(Object)
        },
        {
          id: 'ghi',
          errorMsg: 'three',
          rule: jasmine.any(Object)
        }
      ]);
    })
  });


  describe('transformValidation', () => {

    it('should copy the errorMsg to the output', () => {
      const raw = {
        elemid: '123',
        error_msg: 'cheese',
      };

      const actual = sut.constructor.transformValidation(raw);

      expect(actual.errorMsg).toEqual('cheese');
    });

    it('should convert a criteria to a testable rule in the output', () => {
      const raw = {
        elemid: 'abc',
        error_msg: 'cheese',
        criteria: '1 == 2'
      };

      const actual = sut.constructor.transformValidation(raw);

      expect(actual.rule.expression).toEqual('1 == 2');
    });

  });


  describe('transformVisibility', () => {

    it('should transform the visibility expression to a rule', () => {
      const raw = 'true';

      const actual = sut.constructor.transformVisibility(raw);

      expect(actual.expression).toEqual('true');
      expect(actual.test({})).toBeTruthy();
    });
  });



  describe('mapElement', () => {

    it('should map a minimal element', () => {
      const raw = {
        elemid: '1',
        process: 'initial',
        digitaltype: 'text',
        visible: 'true',
        label: 'label',
        description: 'description',
        channel: 'web',
        elements: [],
        value: 'value',
        validations: [],
        required: false,
      };

      const actual = sut.constructor.mapElement(raw);

      expect(actual).toEqual({
        id: '1',
        process: 'initial',
        type: 'text',
        visibility: jasmine.any(Object),
        label: 'label',
        description: 'description',
        channel: 'web',
        children: [],
        validations: [],
        required: false,
        attr: undefined,
        isAnswered: false
      });
    });

    it('should map options for a picklist', () => {
      const raw = {
        digitaltype: 'picklist',
      };

      const actual = sut.constructor.mapElement(raw);

      expect(actual.options).toBeDefined();
    });

    it('should transform child elements', () => {
      const raw = {
        elements: [
          {
            channel: 'web',
            elements: [
              {
                elemid: '1',
                channel: 'web'
              },
              {
                elemid: '2',
                channel: 'web'
              }
            ]
          }
        ]
      };

      const actual = sut.transformToModel(raw);

      expect(actual[0].children.length).toEqual(2);
    });
  });


  describe('transformToModel', () => {

    it('should transform schema to model', () => {
      const raw = {
        elements: [
          {
            elemid: '1',
            channel: 'web'
          },
          {
            elemid: '2',
            channel: 'mobile'
          }
        ]
      };

      const actual = sut.transformToModel(raw);

      expect(actual.length).toEqual(2);
    });
  });


  describe('filter by channel', () => {

    it('should only include questions with a channel containing some of web,mobile', () => {
      const raw = {
        elements: [
          {
            elemid: '1',
            channel: 'BDC;Web',
            elements: [
              {
                elemid: '2',
                channel: 'BDC'
              },
              {
                elemid: '4',
                channel: null
              },
              {
                elemid: '4',
                channel: undefined
              },
              {
                elemid: '5',
                channel: ''
              },
              {
                elemid: '6',
                channel: 'BDC;Mobile'
              },
              {
                elemid: '6a',
                channel: 'BDC;Web;Mobile'
              },
            ]
          },
          {
            elemid: '7',
            channel: 'BDC',
            elements: [
              {
                elemid: '8',
                channel: 'Mobile'
              },
            ]
          },
          {
            elemid: '9',
            channel: 'Mobile',
          },
        ]
      };

      const actual = sut.transformToModel(raw);

      expect(actual.length).toEqual(2);
      expect(actual[0].children.length).toEqual(2);
    });

  });
});