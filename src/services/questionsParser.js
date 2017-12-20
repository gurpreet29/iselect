import _ from 'lodash';
import {Rule} from '../model';

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;


/**
 * QuestionsParser uplifts the questions to a bindable angular data model
 */
class QuestionsParser {
  constructor($log) {
    this.$log = $log;
  }

  transformToModel(rawJson) {
    return _.map(QuestionsParser.filterChannel(rawJson.elements), QuestionsParser.mapElement);
  }


  static mapElement(element) {
    return _.assign(
      // Always present
      {
        id: element.elemid,
        process: element.process,
        type: element.digitaltype,
        visibility: QuestionsParser.transformVisibility(element.visible),
        label: element.label,
        description: element.description,
        tooltip: element.toolip,
        channel: element.channel,
        children: _.map(QuestionsParser.filterChannel(element.elements), QuestionsParser.mapElement),
        validations: QuestionsParser.transformValidations(element.validations),
        required: element.required,
        attr: element.attr,
        isAnswered: false
      },
      // Conditionally dependent
      QuestionsParser.transformOptions(element),
      QuestionsParser.transformAttributes(element)

    );
  }

  static filterChannel(elements) {
    const relevant = /web|mobile/i;
    return _.filter(elements, (element) => relevant.test(element.channel));
  }

  static transformVisibility(rule) {
    return new Rule(rule)
  }

  static transformValidations(validations) {
    if (!validations) {
      validations = [];
    }

    return _.map(validations, this.transformValidation);
  }

  static transformValidation(validation) {
    return {
      id: validation.elemid.toLowerCase(),
      errorMsg: validation.error_msg,
      rule: new Rule(validation.criteria)
    };
  }


  static transformOptions(element) {
    return _.includes([
      'toggle-button-group',
      'icon-button-group',
      'picklist',
      'radio',
      'checkbox-group',
      'lookup'
      ], element.digitaltype)
      ? {options: element.options || []}
      : {};
  }

    static transformAttributes(element) {
        return _.includes([
            'rating',
            'label'
        ], element.digitaltype)
            ? {attributes: element.attributes || []}
            : {};
    }
}

export default ['$log', QuestionsParser];
