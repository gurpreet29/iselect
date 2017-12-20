import Rule from './rule';


describe('rule', () => {

  describe('transformRuleToTest', () => {

    [
      {rule: '', expected: ''},
      {rule: 'true', expected: 'true'},
      {rule: 'false', expected: 'false'},
      {rule: '{{num_cheeses}} == 1', expected: '{{num_cheeses}} == 1'}
    ].forEach(
      (example) => {
        it(`should map the input rule '${example.rule}' correctly`, () => {
          const actual = new Rule(example.rule);

          expect(actual.expression).toEqual(example.expected);
        });
      }
    );

    [
      {rule: '', params: {}, expectedTemplate: 'true'},
      {rule: 'true', params: {}, expectedTemplate: 'true'},
      {rule: '{{num_cheeses}} == 1', params: {num_cheeses: 2}, expectedTemplate: '2 == 1'},
      {rule: '"{{theAnswer}}" == "ham"', params: {theAnswer: "ham"}, expectedTemplate: '"ham" == "ham"'},
      {
        rule: `today().isAfter(moment('{{earliestDate}}'))`,
        params: {earliestDate: '2017-01-01'},
        expectedTemplate: 'today().isAfter(moment(\'2017-01-01\'))'
      }
    ].forEach(
      (example) => {
        it(`should create a template from the input rule '${example.rule}'`, () => {
          const actual = new Rule(example.rule);

          expect(actual.template(example.params)).toEqual(example.expectedTemplate);
        });
      }
    );

    [
      {rule: '', params: {}, expected: true},
      {rule: 'true', params: {}, expected: true},
      {rule: 'false', params: {}, expected: false},
      {rule: '"{{theAnswer}}" == "yes"', params: {theAnswer: 'no'}, expected: false},
      {rule: '"{{theAnswer}}" == "yes"', params: {theAnswer: 'yes'}, expected: true},
      {rule: '{{num_cheeses}} == 1', params: {num_cheeses: 2}, expected: false},
      {rule: '{{num_cheeses}} != 1', params: {num_cheeses: 2}, expected: true},
      {rule: '{{num_cheeses}} != {{num_crackers}}', params: {num_cheeses: 2, num_crackers: 1}, expected: true},
      {rule: `today().isAfter(moment('{{earliestDate}}'))`, params: {earliestDate: '2017-01-01'}, expected: true},
      {rule: `today().isBefore('{{earliestDate}}')`, params: {earliestDate: '2017-01-01'}, expected: false},
      {rule: `now().isAfter(moment('{{earliestDate}}'))`, params: {earliestDate: '2017-01-01'}, expected: true},
      {rule: `now().isBefore('{{earliestDate}}')`, params: {earliestDate: '2017-01-01'}, expected: false},
      {rule: `now().isAfter(today())`, params: {}, expected: true},
      {rule: `now().isBefore(today())`, params: {}, expected: false},
      {rule: `today().isAfter(now())`, params: {}, expected: false},
      {rule: `today().isBefore(now())`, params: {}, expected: true},
      {rule: `today().add(-1, 'days').isBefore(now())`, params: {}, expected: true}
    ].forEach(
      (example) => {
        it(`should test the rule '${example.rule}'`, () => {
          const actual = new Rule(example.rule);

          expect(actual.test(example.params)).toEqual(example.expected);
        });
      }
    );
  });

});