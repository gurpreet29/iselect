/**
 * A question that requires an address answer
 */
export class BaseQuestion {
  constructor() {

    // Bindings
    this.deviceType = undefined;
    this.question = undefined;
    this.ruleValidatorContext = undefined;
    this.onAnswered = undefined;
    this.onAdded = undefined;
    this.answers = undefined;

    // Scope
    this.form = undefined;
  }

  /**
   * initialise sets up the question, potentially with a restored answer.
   */
  initialise() {
    if(this.restoreAnswer()) {
      this.form.$setDirty();
    } else {
      this.setAnswer(undefined);
    }
  }

  hasErrors(control) {
    return (
      (control && (control.$dirty || this.form.$submitted) && control.$invalid) ||
      (!control && (this.form.$dirty || this.form.$submitted) && this.form.$invalid));
  }

  submit(answer) {
    this.form.$setSubmitted();
    if (this.form.$invalid) return;

    this.setAnswer(answer);
    this.onAnswered({
      $event: {
        answer: answer,
      },
    });
  }

  /**
   * restoreAnswer recovers a saved answer. The base implementation assumes a single value answers key.
   * Override to handle multi-values or complex answer structures.
   *
   * @returns {boolean} - if an answer was restored
   */
  restoreAnswer() {
    this.answer = this.answers[ this.question.id ];
    return this.answer != null;
  }

  setAnswer(answer) {
    this.answers[ this.question.id ] = answer;
  }
}