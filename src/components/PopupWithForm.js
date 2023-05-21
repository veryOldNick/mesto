import Popup from './Popup.js';
// Класс расширяет возможности родительского добовляя элементы работы с данными в форме
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    this._formInputList = {};

    this._inputList.forEach((input) => {
     this._formInputList [input.name] = input.value;
    });
    return this._formInputList;
  };

  close() {super.close(); this._form.reset();};
    
  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  };   
};