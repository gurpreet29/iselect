import _ from 'lodash';

/**
 * QuestionEvaluator maintains the visibility and validation of a set of questions.
 */
class QuestionEvaluator {

  calculateProgress(questions, answers) {
    const extract = (siblingQuestions, objectMap) =>
      _.reduce(
        siblingQuestions,
        (acc, element) => {
          // Only count visible questions, generally conditional on given answers.
          if (element.visibility.test(answers)) {
            // Form pages and labels never count towards progress and are not answered.
            if (!_.includes([ 'form-page', 'label' ], element.type)) {
              acc.relevant++;
              acc.answered += element.isAnswered ? 1 : 0;
            }

            // We only count children if this question is visible (relevant)
            acc = extract(element.children, acc);
          }

          return acc;
        },
        objectMap);

    return extract(questions, { relevant: 0, answered: 0 });
  }
}

export default ['$log', QuestionEvaluator];
