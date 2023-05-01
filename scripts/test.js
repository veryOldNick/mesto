import {openPopup, popupOpenPlace, imagePopupOpenPlace, titlePopupOpenPlace} from './index.js';

export default class Card {
  constructor(data, templateSelector) {
    this._title = data.name;
    this._image = data.link;
    this._template = templateSelector;
  }

  _getTemplate() {
    return document
    .querySelector(this._template)
    .content
    .querySelector('.place')
    .cloneNode(true);
  }

  _createCard() {
    this._card = this._getTemplate();
    this._card.querySelector('.place__title').textContent = this._title;
    this._card.querySelector('.place__image').setAttribute('src', this._image);
    this._card.querySelector('.place__image').setAttribute('alt', this._title);
    return this._card;

  }

  _getLike(evt) {
    evt.target.classList.toggle('place__like-button_active');
  }

  _removeCard() {
    this._card.remove();
  }

  _viewImage() {
    openPopup(popupOpenPlace);
    imagePopupOpenPlace.setAttribute('src', this._image);
    imagePopupOpenPlace.setAttribute('alt', this._title);
    titlePopupOpenPlace.textContent = this._title;
  }

  _setEventListeners() {
    const likeButton =  this._card.querySelector('.place__like-button');
    likeButton.addEventListener('click',(evt) => {this._getLike(evt)});

    const deleteButton = this._card.querySelector('.place__delete-button');
    deleteButton.addEventListener('click', () => {this._removeCard()});

    const cardImage = this._card.querySelector('.place__image');
    cardImage.addEventListener('click', () => {this._viewImage()});
  }

  generateCard() {
    this._createCard();
    this._setEventListeners();
    return this._card;
  }
}