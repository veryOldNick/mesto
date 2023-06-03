// импорты
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards} from "../utils/initialCards.js";
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDeleteCard  from '../components/PopupWithDeleteCard.js';

import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import "./index.css"
import { api } from '../components/Api.js';
import {
  options,
  popupProfileOpenButton,
  popupProfileSaveForm,
  userName,
  profileAvatar,
  jobType,
  userInputTitle,
  jobInputSubtitle,
  popupAddNewSight,
  openAddNewSightButton,
  gallery,
  popupEditProfilePhoto,
  avatarEditButton,
} from "../utils/constants.js";

let userId;
//---------------------------------------------------------

// Получение данных пользователя с сервера для заполнения страницы
Promise.all([api.getUserInfo(), api.getItemInfo()])
  .then(([userInfo, cards]) => {
    userId = userInfo._id;
    galleryList.renderItems(cards);
    // console.log("userInfo", userInfo.avatar);
    user.setUserInfo(userInfo.name, userInfo.about);
    user.setAvatarInfo(userInfo.avatar);
  })
  .catch((err) => console.log(`Ошибка: ${err}`));
//---------------------------------------------------------

// Валидация вводимых данных
const popupFormElementEdit = new FormValidator(options, popupProfileSaveForm);
popupFormElementEdit.enableValidation();

const popupFormElementAdd = new FormValidator(options, popupAddNewSight);
popupFormElementAdd.enableValidation();

const popupFormAvatarEdit = new FormValidator(options, popupEditProfilePhoto);
popupFormAvatarEdit.enableValidation();
//---------------------------------------------------------

// экземпляр класса PopupWithImage определяет адрес открываемого изображения и название
const popupWithImage  = new PopupWithImage('#popup__img');
popupWithImage.setEventListeners();

// функция открывает попап с картинкой при клике на карточку
const handleCardClick = (name, link) => {popupWithImage.open(name, link);};

//cоздаем карточку  с помощью класса
const createCard = (item) => {
  return new Card (
    item, handleCardClick, '#item-template', handleDeleteCard, userId,
    handleLikeCard, handleDislikeCard
  ).renderCard();
};

//функция появления карточки
const addCardToGalery = (item) => {
  const card = createCard(item,);
  // console.log(card);
  galleryList.addItem(card);
}

// /* экземпляр класса PopupWithForm - попап-форма добавления карточки*/
const popupAddCard = new PopupWithForm ('#popup__sight', handleFormSubmitAdd);
popupAddCard.setEventListeners();

//ф-ция добавления карточки через попап-форму
function handleFormSubmitAdd(item) {
  popupAddCard.isLoading(true, "Сохраниние...");
  api.postNewCard(item)
    .then((res) => {
      addCardToGalery(res);
    })
    .then(() => popupAddCard.close())
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      popupAddCard.isLoading(false);
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
  popupProfileEdit.open();
  const userData = user.getUserInfo();
  userName.value = userData.name;
  jobType.value = userData.job;
  // profileAvatar.src = userData.avatar;
};

// /* экземпляр класса PopupWithForm - попап-форма редактирования профиля*/
const popupProfileEdit  = new PopupWithForm ('#popup__profile', handleProfileFormSubmit);
popupProfileEdit.setEventListeners();

popupProfileOpenButton.addEventListener('click', openPopupEditProfile);
// popupProfileSaveForm.addEventListener('click', handleProfileFormSubmit);

//ф-ция сохранения информации после редактирования
function handleProfileFormSubmit(userInfo) {
  popupProfileEdit.isLoading(true, "Сохраниние...");
  api.patchUserInfo(userInfo)
    .then((res) => {
      user.setUserInfo(res.name, res.about);
    })
    .then(() => popupProfileEdit.close())
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      popupProfileEdit.isLoading(false);
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
      card.toggleLike();
      card.reckonAmountLikes(res);
    })
    .catch((err) => { console.log(err) });
};

const handleDislikeCard = (card) => {  
  api.deleteLikeCard(card.receiveId())
    .then((res) => {
      card.toggleLike();
      card.reckonAmountLikes(res);
    })
    .catch((err) => { console.log(err) });
  
};

// аватар
const popupEditAvatar = new PopupWithForm("#popup_avatar", handleAvatarSubmit);
popupEditAvatar.setEventListeners();


avatarEditButton.addEventListener("click", function () {
  popupEditAvatar.open();
});
 
function handleAvatarSubmit(userInfo) {
  popupEditAvatar.isLoading(true, "Сохраниние...");
  
  api.patchUserAvatar(userInfo)
    .then((res) => {
      console.log(res);
      user.setAvatarInfo(res.avatar);
      // console.log(user);
    })
    .then(() => popupEditAvatar.close())
    .catch((err) => console.log(err))
    .finally(() => {
      popupEditAvatar.isLoading(false);
    });;    
};
