import _ from 'lodash';

export default [
  () => ({
    require: 'ngModel',
    link: (scope, elm, attr, ctrl) => {

      const ruleValidatorContext = scope.$ctrl.ruleValidatorContext;

      _.forEach(
        ruleValidatorContext.validations,
        (validation) => {
          ctrl.$validators[ validation.id ] = (modelValue, viewValue) => {

            if (ctrl.$isEmpty(modelValue)) {
              // consider empty models to be valid
              return true;
            }

            // Clone as we are modifying with local value and don't want this propagated.
            // Note that this doesn't work on compound flattened answers (address, multi-select checkboxes).
            // Designed for single value inputs.
            const workingAnswers = _.clone(ruleValidatorContext.answers);

            if (modelValue instanceof Date) {
              modelValue = modelValue.toISOString();
            }

            workingAnswers[ ruleValidatorContext.questionId ] = modelValue;

            // If the rule matches, return false (invalid).
            // Else return true (valid).
            return !validation.rule.test(workingAnswers);
          }
        }
      )
    }
  })
]