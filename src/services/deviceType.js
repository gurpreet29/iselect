import angular from "angular";

class DeviceType {
  constructor($window, $rootScope) {
    this.$window = $window;
    this.$rootScope = $rootScope;

    this.viewport = undefined;
    this.os = undefined;

    this.setDeviceType();
    angular.element(this.$window).bind('resize', () => this.applyDeviceType());
  }

  isMobile() {
    return this.viewport === 'mobile';
  }

  isTablet() {
    return this.viewport === 'tablet';
  }

  isDesktop() {
    return this.viewport === 'desktop';
  }

  /**
   * setDeviceType changes the value of the deviceType prop.
   */
  setDeviceType() {
    this.viewport = this.$window.document.body.clientWidth >= 940 ? 'desktop' : (this.$window.document.body.clientWidth >= 720 ? 'tablet' : 'mobile');
    this.os = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
  }

  /**
   * applyDeviceType sets the device type and triggers an angular digest cycle to re-render.
   */
  applyDeviceType() {
    this.setDeviceType();
    this.$rootScope.$apply();
  }

}

export default [ '$window', '$rootScope', DeviceType ];