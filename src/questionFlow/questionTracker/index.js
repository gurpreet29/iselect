import _ from 'lodash';

class QuestionTracker {
  constructor($timeout) {
    this.$timeout = $timeout;
    this.questionsPendingActive = [];
  }

  becameActive(question, scrollAction) {
    if (this.questionsPendingActive.length === 0) {
      this.$timeout(() => this.processActivation(), 0)
    }
    this.questionsPendingActive.push({ question, scrollAction });
  }

  processActivation() {
    // Only scroll to first activated question.
    if (this.questionsPendingActive.length > 0) {
      this.questionsPendingActive[0].scrollAction();
    }

    this.questionsPendingActive = [];
  }
}

export default [ '$timeout', QuestionTracker ];