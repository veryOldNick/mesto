// импорты
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards} from "../components/initialCards.js";
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import "./index.css"
import { api } from '../components/Api.js';

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
const profileAvatar = document.querySelector('.profile__photo');
const jobType = document.querySelector('.popup__input_form_job');
const userInputTitle = document.querySelector('.profile__title');
const jobInputSubtitle = document.querySelector('.profile__describle');
const popupAddNewSight = document.querySelector("#popup__sight");
const openAddNewSightButton = document.querySelector('.profile__add');
const gallery = document.querySelector('.gallery__list');

let userId;

// Получение данных пользователя с сервера для заполнения страницы
Promise.all([api.getUserInfo(), api.getItemInfo()])
  .then(([userInfo, cards]) => {
    userId = userInfo._id;
    galleryList.renderItems(cards);
    user.setUserInfo(userInfo.name, userInfo.about);
    user.setAvatarInfo(userInfo.avatar);
  })
  .catch((err) => console.log(`Ошибка: ${err}`));



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

// /* экземпляр класса PopupWithForm - попап-форма добавления карточки*/
const popupAddCard = new PopupWithForm ('#popup__sight', handleFormSubmitAdd);
popupAddCard.setEventListeners();


//ф-ция добавления карточки через попап-форму
function handleFormSubmitAdd(item) {  
  api.postNewCard(item)
    .then((res) => {
      addCardToGalery(res);
    })
    .catch((err) => console.log(`Ошибка: ${err}`));    
};

openAddNewSightButton.addEventListener('click', () => {popupAddCard.open();});

// экземпляр класса Section - заполнение галереи
const galleryList = new Section({items:initialCards, renderer:addCardToGalery}, gallery);
console.log("2", galleryList);




// экземпляр класса UserInfo - отвечает за управление отображением информации о пользователе на странице
const user = new UserInfo({
  userName: userInputTitle,
  userJob: jobInputSubtitle,
  avatar: profileAvatar,
});

//ф-ция открытия модального окна редактирования профиля
function openPopupEditProfile() {
  const userData = user.getUserInfo();
  userName.value = userData.name;
  jobType.value = userData.job;
  popupProfileEdit.open();
};

// //ф-ция сохранить информации после редактирования
// function handleProfileFormSubmit({name, job}) { 
//   user.setUserInfo(name, job);
//  };

//ф-ция сохранения информации после редактирования
function handleProfileFormSubmit(userInfo) {
  api.patchUserInfo(userInfo)
    .then((res) => {
      user.setUserInfo(res.name, res.about);
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
};


//-------------------------------
// функция удаления карточки

// const handleDeleteCard = (el) => {
//   api.deleteCard(el)
//     .then((res) => {
//       popupOpenDeleteCard.open(res);
//       deleteCard();
//     })
//     .catch((err) => console.log(`Ошибка: ${err}`))
// }


//-----------------------------

// /* экземпляр класса PopupWithForm - попап-форма редактирования профиля*/
const popupProfileEdit  = new PopupWithForm ('#popup__profile', handleProfileFormSubmit);
popupProfileEdit.setEventListeners();

popupProfileOpenButton.addEventListener('click', openPopupEditProfile);
popupProfileSaveForm.addEventListener('click', handleProfileFormSubmit);