import moment from 'moment';
import { BaseQuestion } from '../baseQuestion';
import view from './view.html';
import './local.less';

/**
 * A question that requires a date answer
 */
class DateQuestion extends BaseQuestion {
  constructor($timeout) {
    super();

    this.$timeout = $timeout;

    // Scope
    // Moment and UIB have different date formats, .: we need to duplicate and maintain 1-2-1 :-(
    this.inputFormat = 'dd/MM/yyyy';
    this.answerFormat = 'YYYY-MM-DD';
    // noinspection JSUnusedGlobalSymbols
    this.altInputFormats = [ 'd!-M!-yy', 'd!/M!/yy', 'd!-M!-yyyy', 'd!/M!/yyyy', 'yyyy/MM/dd', 'yyyy-MM-dd', 'd!.M!.yy', 'd!.M!.yyyy' ];
    // noinspection JSUnusedGlobalSymbols
    this.dateSelected = undefined;
    // noinspection JSUnusedGlobalSymbols
    this.datePickerOptions = undefined;
    // noinspection JSUnusedGlobalSymbols
    this.pickerOpen = false;
    this.pickedDate = undefined;
    this.nativeDate = undefined;
  }

  // noinspection JSUnusedGlobalSymbols
  $postLink() {
    // noinspection JSUnusedGlobalSymbols
    this.datePickerOptions = {
      datepickerMode: this.question.attr.mode || 'day',
      showWeeks: false
    };

    this.initialise();
  }

  openPicker() {
    // noinspection JSUnusedGlobalSymbols
    this.pickerOpen = true;
  }

  select() {
    this.submit(this.answer);
  }

  restoreAnswer() {
    const answeredValue = this.answers[ this.question.id ];

    if (answeredValue) {
      this.answer = moment(answeredValue, this.answerFormat).toDate();
    }

    return this.answer != null;
  }

  setAnswer(answer) {
    this.answers[ this.question.id ] = answer ? moment(answer).format(this.answerFormat) : undefined;
  }
}

export default {
  bindings: {
    deviceType: '<',
    question: '<',
    ruleValidatorContext: '<',
    onAnswered: '&',
    answers: '<'
  },
  template: view,
  controller: [ '$timeout', DateQuestion ]
}
