import moment from 'moment';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';


const CAPTURE_COOKIE_ID = 'capture';
const CAPTURE_SESSION_DURATION_DAYS = 30;


class CaptureManager {
  constructor($cookies, guid) {
    this.$cookies = $cookies;
    this.guid = guid;
  }

  /**
   * getExistingCaptureCookie returns an existing capture cookie.
   */
  getExistingCaptureCookie() {
    return this.$cookies.getObject(CAPTURE_COOKIE_ID);
  }

  /**
   * getOrMakeCaptureCookie sets up or restores an existing capture session.
   */
  getOrMakeCaptureCookie() {
    if (this.hasActiveCaptureSession()) {
      return this.getExistingCaptureCookie()
    }

    const newCookie = {
      sessionId: this.guid.create(),
      captureDecision: undefined,
      leadCreated: false,
      resumeHash: undefined,
    };
    this.updateCaptureCookie(newCookie);

    return newCookie;
  }

  /**
   * updateCaptureCookie is a private method to update the capture cookie.
   * @param newCookie
   */
  updateCaptureCookie(newCookie) {
    this.$cookies.putObject(CAPTURE_COOKIE_ID, newCookie, { expires: moment().add(CAPTURE_SESSION_DURATION_DAYS, 'days').toDate() });
  }

  /**
   * hasActiveCaptureSession returns whether an active capture session exists.
   * @returns {boolean}
   */
  hasActiveCaptureSession() {
    return !!this.getExistingCaptureCookie();
  }

  /**
   * getActiveCaptureSessionId returns the value of the capture session guid.
   * @returns {*|string}
   */
  getActiveCaptureSessionId() {
    return this.getExistingCaptureCookie().sessionId;
  }

  /**
   * recordCaptureDecision stores the decision regarding whether to capture in the capture cookie.
   * @param decision {'Capture'|'OptCapture'|'NoCapture'}
   */
  recordCaptureDecision(decision) {
    const captureCookie = this.getOrMakeCaptureCookie();
    captureCookie.captureDecision = decision;
    this.updateCaptureCookie(captureCookie);
  }

  /**
   * getPreviousCaptureDecision returns the result of the capture decision. Or undefined if not yet made.
   * @returns {'Capture'|'OptCapture'|'NoCapture'|undefined}
   */
  getPreviousCaptureDecision() {
    if (!this.hasActiveCaptureSession()) {
      return undefined;
    }

    return this.getExistingCaptureCookie().captureDecision;
  }

  /**
   * recordLeadCreated stores that the lead API has been called with captured user details.
   */
  recordLeadCreated() {
    const captureCookie = this.getOrMakeCaptureCookie();
    captureCookie.leadCreated = true;
    this.updateCaptureCookie(captureCookie);
  }

  /**
   * wasLeadCreated indicates whether a lead with captured user details has been created.
   * Undefined when no capture session exists.
   * @returns {boolean|undefined}
   */
  wasLeadCreated() {
    if (!this.hasActiveCaptureSession()) {
      return false;
    }

    return this.getExistingCaptureCookie().leadCreated;
  }

  recordResumeState(key, answer) {
    const captureCookie = this.getOrMakeCaptureCookie();
    captureCookie.resumeHash = CaptureManager.hashResumeState(key, answer);
    this.updateCaptureCookie(captureCookie);
  }

  canSessionBeResumed(key, answer) {
    if (!this.hasActiveCaptureSession()) {
      return false;
    }

    const cookie = this.getExistingCaptureCookie();

    if (!(cookie.captureDecision && cookie.resumeHash)) {
      return false;
    }

    const hashForThisKeyAnswer = CaptureManager.hashResumeState(key, answer);
    return hashForThisKeyAnswer === cookie.resumeHash;
  }

  static hashResumeState(key, answer) {
    answer = angular.toJson(answer);
    return Base64.stringify(sha256(key + answer));
  }
}


export default [ '$cookies', 'guid', CaptureManager ]