export default class Section {
  constructor({renderer}, gallery) {
    this._renderer = renderer;
    this._container = gallery;
  }

  addItem(item) {this._container.prepend(item);};

  renderItems(cards) {
    cards.forEach((item) => {this._renderer(item);})};
};
