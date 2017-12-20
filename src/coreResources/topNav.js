import view from './view.html';


/**
 * TopNav shows the top navigation header
 */
class TopNav {
  constructor(verticalTitle) {
    this.verticalTitle = verticalTitle;
  }
}

export default {
  bindings: {},
  template: view,
  controller: [ 'verticalTitle', TopNav]
};