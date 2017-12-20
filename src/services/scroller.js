const SCROLL_DELAY = 500;
const SCROLL_DURATION = 1000;
const MOBILE_TOP_OFFSET = 25;

class Scroller {
  constructor($window, $document, $timeout, deviceType) {
    this.$window = $window;
    this.$document = $document;
    this.$timeout = $timeout;
    this.deviceType = deviceType;
  }

  scrollOffset(questionHeight) {
    if (this.deviceType.isMobile()) {
      return MOBILE_TOP_OFFSET;
    }

    return questionHeight >= this.$window.innerHeight ? 100 : (this.$window.innerHeight / 2.0) - (questionHeight / 2.0) - 50;
  }

  scrollTo(element, duration = SCROLL_DURATION, delay = SCROLL_DELAY) {
    element = element.length && element[0] || element;

    // After digest cycle focus to end of question.
    this.$timeout(() => {
      this.$document.duScrollTo(
        element,
        this.scrollOffset(element.clientHeight),
        duration)
        .catch(() => {});
    }, delay);
  }
}

export default [ '$window', '$document', '$timeout', 'deviceType', Scroller ]