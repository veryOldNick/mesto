export default class Card {
  constructor(data, openImage, templateSelector, handleDeleteCard, userId, handleLikeCard, handleDislikeCard) {
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
    this._handleDislikeCard = handleDislikeCard;
    this._likes = this.data.likes;
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
    this._renderLike();
    
    return this._card;
  };

  _setEventListeners() {
    this._like =  this._card.querySelector('.gallery__like');
    const remove = this._card.querySelector('.gallery__remove');
    this._likeAmount = this._card.querySelector('.gallery__like-sum');

    this._myLikeCheck();
        
    if (this._ownerId !== this._userId) {
      remove.remove();
    }
       
    this._like.addEventListener("click", (evt) => {
      if (this._like.classList.contains('gallery__like_on')) {
         this._handleDislikeCard(this);
       } else {
          this._handleLikeCard(this);          
          }
    });

  remove.addEventListener('click', () => this._handleDeleteCard(this.data, this));
    this._itemImg.addEventListener('click', () => {
      this._openImage(this._name, this._link)});
  };

  renderCard() {
    this._createCard();
    this._setEventListeners();
    return this._card;
  };
 
  deleteCard = () => {this._card.remove();};

  _renderLike() {
    this._likeAmount = this._card.querySelector('.gallery__like-sum');
    this._likeAmount.textContent = this._likes.length;
  };
     
  receiveId() {
    return this._id;
  };

  likesAmmount(data) {
    this._likeAmount.textContent = data.likes.length;
  };

  _myLikeCheck() {
    if (
      this._likes.filter((like) => like._id === this._userId)
        .length > 0
    ) {
      this._like.classList.add("gallery__like_on");
    }
  };

};
