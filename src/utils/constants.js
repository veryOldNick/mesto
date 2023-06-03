// селекторы для валидации
export const options = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button_save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

// константы и переменные
const profilePopup = document.querySelector('#popup__profile');
export const popupProfileOpenButton = document.querySelector('.profile__edit');
export const popupProfileSaveForm = profilePopup.querySelector("#profile_form");
export const userName = document.querySelector('.popup__input_form_name');
export const profileAvatar = document.querySelector('.profile__photo');
export const jobType = document.querySelector('.popup__input_form_job');
export const userInputTitle = document.querySelector('.profile__title');
export const jobInputSubtitle = document.querySelector('.profile__describle');
export const popupAddNewSight = document.querySelector("#popup__sight");
export const openAddNewSightButton = document.querySelector('.profile__add');
export const gallery = document.querySelector('.gallery__list');
export const popupEditProfilePhoto = document.querySelector("#popup_avatar");
export const avatarEditButton = document.querySelector('.profile__avatar-btn');