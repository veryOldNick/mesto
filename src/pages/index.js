// импорты
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards} from "../components/initialCards.js";
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDeleteCard  from '../components/PopupWithDeleteCard.js';

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
const popupEditProfilePhoto = document.querySelector("#popup_avatar");

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

const popupFormAvatarEdit = new FormValidator(options, popupEditProfilePhoto);
popupFormAvatarEdit.enableValidation();

// экземпляр класса PopupWithImage определяет адрес открываемого изображения и название
const popupWithImage  = new PopupWithImage('#popup__img');
popupWithImage.setEventListeners();

// функция открывает попап с картинкой при клике на карточку
const handleCardClick = (name, link) => {popupWithImage.open(name, link);};

//cоздаем карточку  с помощью класса
const createCard = (item) => {
  return new Card (item, handleCardClick, '#item-template', handleDeleteCard, userId, handleLikeCard, handleDislikeCard);
};

//функция появления карточки
const addCardToGalery = (item) => {
  const card = createCard(item,);
  
  galleryList.addItem(card.renderCard());
}

// /* экземпляр класса PopupWithForm - попап-форма добавления карточки*/
const popupAddCard = new PopupWithForm ('#popup__sight', handleFormSubmitAdd);
popupAddCard.setEventListeners();


//ф-ция добавления карточки через попап-форму
function handleFormSubmitAdd(item) {
  popupAddCard.loading(true, "Сохраниние...");
  api.postNewCard(item)
    .then((res) => {
      addCardToGalery(res);
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      popupProfileEdit.loading(false);
    });    
};

openAddNewSightButton.addEventListener('click', () => {popupAddCard.open();});

// экземпляр класса Section - заполнение галереи
const galleryList = new Section({items:initialCards, renderer:addCardToGalery}, gallery);



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

//ф-ция сохранения информации после редактирования
function handleProfileFormSubmit(userInfo) {
  popupProfileEdit.loading(true, "Сохраниние...");
  api.patchUserInfo(userInfo)
    .then((res) => {
      user.setUserInfo(res.name, res.about);
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      popupProfileEdit.loading(false);
    });
};

// функция удаления карточки

// попап-форма удаления карточки
const popupCardDelete = new PopupWithDeleteCard ('#popup__del');
popupCardDelete.setEventListeners();

function handleDeleteCard(data, card) {
  popupCardDelete.open();
  popupCardDelete.handleSubmitAction( () => {
    api.deleteItemCard(data._id)
    .then(() => {
      popupCardDelete.close();
      card.deleteCard();     
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
  });  
};

// лайк и дизлайк
const handleLikeCard = (card) => {    
  api.putLikeCard(card.receiveId())
    .then((res) => {
      card._like.classList.toggle('gallery__like_on');
      card.likesAmmount(res);
    })
    .catch((err) => { console.log(err) });
};

const handleDislikeCard = (card) => {  
  api.deleteLikeCard(card.receiveId())
    .then((res) => {
      card._like.classList.toggle('gallery__like_on');
      card.likesAmmount(res);
    })
    .catch((err) => { console.log(err) });
  
};

// аватар
const popupEditAvatar = new PopupWithForm("#popup_avatar", handleAvatarSubmit);
popupEditAvatar.setEventListeners();

const avatarEditButton = document.querySelector('.profile__avatar-btn');
avatarEditButton.addEventListener("click", function () {
  popupEditAvatar.open();
});
 
function handleAvatarSubmit(item) {
  popupEditAvatar.loading(true, "Сохраниние...");
  
  api.patchUserAvatar(item)
    .then((res) => {
      user.setAvatarInfo(res);
    })
    .then(() => popupEditAvatar.close())
    .catch((err) => console.log(err))
    .finally(() => {
      popupEditAvatar.loading(false);
    });;
    
};

// /* экземпляр класса PopupWithForm - попап-форма редактирования профиля*/
const popupProfileEdit  = new PopupWithForm ('#popup__profile', handleProfileFormSubmit);
popupProfileEdit.setEventListeners();

popupProfileOpenButton.addEventListener('click', openPopupEditProfile);
popupProfileSaveForm.addEventListener('click', handleProfileFormSubmit);