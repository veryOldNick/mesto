export default class Card {
  constructor(data, openImage, templateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._openImage = openImage;
  }
  
   _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.gallery__item')
    .cloneNode(true);
  };

  _createCard() {
    this._card = this._getTemplate();
    this._itemImg = this._card.querySelector('.gallery__pic');
    this._card.querySelector('.gallery__name').textContent = this._name;
    this._itemImg.setAttribute('src', this._link);
    this._itemImg.setAttribute('alt', this._name);
    return this._card;
  };

  _setEventListeners() {
    const like =  this._card.querySelector('.gallery__like');
    const remove = this._card.querySelector('.gallery__remove');
        
    like.addEventListener('click', (evt) => {evt.target.classList.toggle('gallery__like_on');});
    remove.addEventListener('click', () => {this._card.remove();});
    this._itemImg.addEventListener('click', () => {
      this._openImage(this._name, this._link)});
  };

  renderCard() {
    this._createCard();
    this._setEventListeners();
    return this._card;
  };
};