export default class Card {
  constructor(data, openImage, templateSelector, handleDeleteCard, userId, handleLikeCard) {
    this.data = data;
    this._id = data._id;
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._openImage = openImage;
    this._handleDeleteCard = handleDeleteCard;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._handleLikeCard = handleLikeCard;
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
    if (this._ownerId !== this._userId) {
      remove.remove();
    }
        
    like.addEventListener('click', (evt) => {evt.target.classList.toggle('gallery__like_on');});
    // remove.addEventListener('click', this.deleteCard);
    remove.addEventListener('click', () => this._handleDeleteCard(this.data, this));
    this._itemImg.addEventListener('click', () => {
      this._openImage(this._name, this._link)});
  };

  renderCard() {
    this._createCard();
    this._setEventListeners();
    return this._card;
  };
 
  deleteCard = () => {this._card.remove();  };
};
