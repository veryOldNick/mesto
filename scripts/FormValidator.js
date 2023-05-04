export default class FormValidator {
  constructor(options, formElement) {
    this._formElement = formElement;
    this._options = options;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._options.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._options.submitButtonSelector);
  }
  
  enableValidation() {
    this._toggleButtonState();
    this._setEventListeners()};

  /*Функция перебирает инпуты, вызывает обработчики */
  _setEventListeners() {    
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });    
    });
    this._formElement.addEventListener('reset', () => {setTimeout(() => {this._toggleButtonState(), 0})})
  };

  // Функция показывает/скрывает ошибку у инпута
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

    // Функция выводит сообщение об ошибке
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
  
    inputElement.classList.add(this._options.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._options.errorClass);
  };
  
    // Функция скрывает сообщение об ошибке
  _hideInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
      inputElement.classList.remove(this._options.inputErrorClass);
      errorElement.classList.remove(this._options.errorClass);
      errorElement.textContent = '';
  };
  
    // Функция проверяет есть ли инпуты не прошедшие валидацию
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return (!inputElement.validity.valid || !inputElement.value);
    });
  };

   //Функция делает кнопку активной/неактивной, если инпуты прошли/не прошли валидацию 
  _toggleButtonState() {
    if(this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._options.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._options.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }};
};
