// импорты
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards} from "./initialCards.js";
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';
import "../pages/index.css"

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
const popupProfileSaveForm = profilePopup.querySelector("#profile_form");
const userName = document.querySelector('.popup__input_form_name');
const jobType = document.querySelector('.popup__input_form_job');
const userInputTitle = document.querySelector('.profile__title');
const jobInputSubtitle = document.querySelector('.profile__describle');
const popupAddNewSight = document.querySelector("#popup__sight");
const openAddNewSightButton = document.querySelector('.profile__add');
const gallery = document.querySelector('.gallery__list');

// Валидация вводимых данных
const popupFormElementEdit = new FormValidator(options, popupProfileSaveForm);
popupFormElementEdit.enableValidation();

const popupFormElementAdd = new FormValidator(options, popupAddNewSight);
popupFormElementAdd.enableValidation();

// экземпляр класса PopupWithImage определяет адрес открываемого изображения и название
const popupWithImage  = new PopupWithImage('#popup__img');
popupWithImage.setEventListeners();

// функция открывает попап с картинкой при клике на карточку
const handleCardClick = (name, link) => {popupWithImage.open(name, link);};

//cоздаем карточку  с помощью класса
const createCard = (item) => {
  return new Card (item, handleCardClick, '#item-template').renderCard();
};

//функция появления карточки
const addCardToGalery = (item) => {
  const card = createCard(item, handleCardClick, '#item-template');
  galleryList.addItem(card);
}

/* экземпляр класса PopupWithForm - попап-форма добавления карточки*/
const popupAddCard = new PopupWithForm ('#popup__sight', addCardToGalery);
popupAddCard.setEventListeners();

openAddNewSightButton.addEventListener('click', () => {popupAddCard.open();});

// экземпляр класса Section - заполнение галереи
const galleryList = new Section({items:initialCards, renderer:addCardToGalery}, gallery);
galleryList.renderItems();

// экземпляр класса UserInfo - отвечает за управление отображением информации о пользователе на странице
const user = new UserInfo({userName: userInputTitle,  userJob: jobInputSubtitle,});

//ф-ция открытия модального окна редактирования профиля
function popupEditProfile() {
  const userObject = user.getUserInfo();
  userName.value = userObject.name;
  jobType.value = userObject.job;
  popupProfileEdit.open();
};

//ф-ция сохранить информации после редактирования
function handleProfileFormSubmit({name, job}) { 
  user.setUserInfo(name, job);
 };

// /* экземпляр класса PopupWithForm - попап-форма редактирования профиля*/
const popupProfileEdit  = new PopupWithForm ('#popup__profile', handleProfileFormSubmit);
popupProfileEdit.setEventListeners();

popupProfileOpenButton.addEventListener('click', popupEditProfile);
popupProfileSaveForm.addEventListener('click', handleProfileFormSubmit);