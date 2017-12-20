import _ from 'lodash';
import moment from 'moment';


export default class Rule {
  constructor(expression) {
    this.expression = expression;
    this.template = _.template(expression || 'true');
    this.test = this.constructor.transformRuleToTest(this.template);
  }

  static transformRuleToTest(template) {
    return (params) => {
        return new Function('moment', `
            var today = (function today() { return moment().startOf('day'); });
            var now = (function now() { return moment(); });
            return (${template(params)});
          `)(moment);
      }
  }
}
