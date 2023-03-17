const setting = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__button_submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};





// const options = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__submit-button',
//   inactiveButtonClass: 'popup__button_submit_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__input-error_visible'
// };

// //Функция показывает сообщение об ошибке
// const showInputError = (formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) => {
//   inputElement.classList.add(inputErrorClass);
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(errorClass);
// };

// //Функция прячет сообщение об ошибке
// const hideInputError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.remove(inputErrorClass);
//   errorElement.classList.remove(errorClass);
//   errorElement.textContent = '';
// };

// //Скрываем сообщения об ошибке при открытие
// const setDefaultErrorState = (formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
//   inputList.forEach((inputElement) => {
//     hideInputError(formElement, inputElement, options);
//   });
// };

// // проверяем есть ли инпуты не прошедшие валидацию
// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return (!inputElement.validity.valid || !inputElement.value);
//   });
// };

// // Функция показывает/скрывает ошибку у инпута
// const checkInputValidity = (formElement, inputElement, options) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, options);
//   } else {
//     hideInputError(formElement, inputElement, options);
//   }
// };

// //Дефолтное состояние кнопки при открытие
// const setDefaultButtonState = (buttonElement, inactiveButtonClass) => {
//   buttonElement.classList.add(inactiveButtonClass);
// };

// //Функция делает кнопку активной/неактивной, если инпуты прошли/не прошли валидацию
// const toggleButtonState = (inputList, buttonElement, { inactiveButtonClass }) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(inactiveButtonClass);
//   } else {
//     buttonElement.classList.remove(inactiveButtonClass);
//   }
// };

// //Функция вызывает обработчики событий для инпутов, кнопок
// const setEventListeners = (formElement, { inputSelector, submitButtonSelector, ...options }) => {
//   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//   const buttonElement = formElement.querySelector(submitButtonSelector);
//   toggleButtonState(inputList, buttonElement, options);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       checkInputValidity(formElement, inputElement, options);
//       toggleButtonState(inputList, buttonElement, options);
//     });
//   });
// };

// //Сама функция валидации
// const enableValidation = ({ formSelector, ...options }) => {
//   const formList = Array.from(document.querySelectorAll(formSelector));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//       const buttonElement = formElement.querySelector(options.submitButtonSelector);
//       setDefaultButtonState(buttonElement, options.inactiveButtonClass);
//     });
//     setEventListeners(formElement, options);
//   });
// };

// //Вызов функции enableValidation и передача ей объекта, как аргумента
// enableValidation(options);