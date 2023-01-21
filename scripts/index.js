const popupElement = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile_edit');
const popupCloseButton = popupElement.querySelector('.popup__closeform-button');
const popupSaveButton = popupElement.querySelector(".popup__button-save");

let username = document.querySelector('.popup__input-name');
let jobtype = document.querySelector('.popup__input-job');
let userInputTitle = document.querySelector('.profile__title');
let jobInputSubtitle = document.querySelector('.profile__describle');


const openPopup = function() {
  popupElement.classList.add('popup_opened');
  username.value = userInputTitle.textContent;
  jobtype.value = jobInputSubtitle.textContent;
}


const closePopup = function() {
  popupElement.classList.remove('popup_opened');
}


const saveButton = function(evt) {
  evt.preventDefault();
  userInputTitle.textContent = username.value;
  jobInputSubtitle.textContent = jobtype.value;
}


popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupSaveButton.addEventListener('submit', saveButton);
