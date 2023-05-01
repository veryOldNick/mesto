// импорт
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards} from "./initialCards.js";

// селекторы для валидации
const options = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button_save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
  }

const profilePopup = document.querySelector('#popup__profile');
const popupProfileOpenButton = document.querySelector('.profile__edit');
const popupProfileCloseButton = profilePopup.querySelector('.popup__close-button');
const popupProfileSaveForm = profilePopup.querySelector("#profile_form");
const userName = document.querySelector('.popup__input_form_name');
const jobType = document.querySelector('.popup__input_form_job');
const userInputTitle = document.querySelector('.profile__title');
const jobInputSubtitle = document.querySelector('.profile__describle');

const popupAddNewSight = document.querySelector("#popup__sight");
const addNewSightForm = popupAddNewSight.querySelector(".popup__form");
const openAddNewSightButton = document.querySelector('.profile__add');
const closeButtonSight = popupAddNewSight.querySelector('.popup__close-button');
const placeInput = popupAddNewSight.querySelector(".popup__input_form_place");
const linkInput = popupAddNewSight.querySelector(".popup__input_form_link");

// const template = document.querySelector('#item-template').content;
const gallery = document.querySelector('.gallery__list');
const popupOpenImage = document.querySelector('#popup__img');
const popupImage = popupOpenImage.querySelector('.popup__image');
const popupImageCaption = popupOpenImage.querySelector('.popup__caption');
const closeButtonImageOpen = popupOpenImage.querySelector('.popup__close-button');

// /* popup редактирования профиля */
// /* функция заполнения формы действующими значениями профиля */
const fillFormFromProfile = () => {
  userName.value = userInputTitle.textContent;
  jobType.value = jobInputSubtitle.textContent;
}

// /* функция заполнения профиля данными из формы */
const fillProfileFromForm = () => {
  userInputTitle.textContent = userName.value;
  jobInputSubtitle.textContent = jobType.value;
}

/* открыть popup */
const openPopup = (popup) => { 
  popup.classList.add('popup_opened'); 
  document.addEventListener("keydown", closeEsc);
  popup.addEventListener('click', closeClickOverlay);
}

/* закрыть popup */
const closePopup = (popup) => { 
  popup.classList.remove('popup_opened'); 
  document.removeEventListener("keydown", closeEsc);
  popup.removeEventListener("keydown", closeClickOverlay);}
/* закрыть popup используя Esc */
const closeEsc = (e) => { 
  if (e.key === 'Escape') { 
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);}}
/* закрыть popup используя click by overlay */
const closeClickOverlay = (e) => {
  const popup = document.querySelector('.popup_opened');
  if (e.target === popup) {
    closePopup(popup);}}
/* обработчик нажатия на кнопку - edit */
const editPopupProfileButton = () => { fillFormFromProfile(); openPopup(profilePopup);}
/* обработчик нажатия на кнопку - Сохранить */
const submitProfileForm = (evt) => { evt.preventDefault(); fillProfileFromForm(); closePopup(profilePopup);}

/* активация */
popupProfileOpenButton.addEventListener('click', editPopupProfileButton);
popupProfileCloseButton.addEventListener('click', () => closePopup(profilePopup));
popupProfileSaveForm.addEventListener('submit', submitProfileForm);

/* Добавить карточку через popup */
const addNewCard = (evt) => {
  evt.preventDefault();  
  const card = addCardToGalery(placeInput.value, linkInput.value);
  closePopup(popupAddNewSight);
  addNewSightForm.reset();
};

// кнопка открыть popup
openAddNewSightButton.addEventListener('click', () => openPopup(popupAddNewSight));
// кнопка закрыть popup
closeButtonSight.addEventListener('click', () => closePopup(popupAddNewSight));
// кнопка создать
addNewSightForm.addEventListener('submit', addNewCard);

const openImage = (name, link) => {
  openPopup(popupOpenImage);
  popupImage.src = link;
  popupImage.alt = name;
  popupImageCaption.textContent = name;
};

const addCardToGalery = (data) => {
  const newCard = new Card(data, openImage, '#item-template');
  gallery.prepend(newCard.renderCard());
};

// заполнить галерею
initialCards.forEach((item) => {addCardToGalery(item)});

// закрыть попап просмотра фотографий
closeButtonImageOpen.addEventListener('click', () => closePopup(popupOpenImage));


// Валидация вводимых данных
const popupFormElementEdit = new FormValidator(options, popupProfileSaveForm);
popupFormElementEdit.enableValidation();


const popupFormElementAdd = new FormValidator(options, popupAddNewSight);
popupFormElementAdd.enableValidation();