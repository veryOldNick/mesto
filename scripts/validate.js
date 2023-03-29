const options = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button_save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};


//Функция выводит сообщение об ошибке
const showInputError = (formElement, inputElement, options) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    
  inputElement.classList.add(options.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(options.errorClass);
};

//Функция скрывает сообщение об ошибке
const hideInputError = (formElement, inputElement, options) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    
  inputElement.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = '';
};

// Функция показывает/скрывает ошибку у инпута
const checkInputValidity = (formElement, inputElement, options) => {
  
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
};

// Функция проверяет есть ли инпуты не прошедшие валидацию
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return (!inputElement.validity.valid || !inputElement.value);
  });
};

//Функция делает кнопку активной/неактивной, если инпуты прошли/не прошли валидацию
const toggleButtonState = (inputList, buttonElement, options) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(options.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  } else {
    buttonElement.classList.remove(options.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  }
};

/*Функция перебирает инпуты, вызывает обработчики */
const setEventListeners = (formElement, options) => {
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  const buttonElement = formElement.querySelector(options.submitButtonSelector);
  
  toggleButtonState(inputList, buttonElement, options);
  inputList.forEach((inputElement) => {    
    inputElement.addEventListener('input', () => {      
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputList, buttonElement, options);
    });
  });
};

/*Функция перебирает формы */
const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));

  formList.forEach((formElement) => {setEventListeners(formElement, options);});
};

enableValidation(options);