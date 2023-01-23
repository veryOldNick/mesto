const popupElement = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit');
const popupCloseButton = popupElement.querySelector('.popup__close-button');
const popupSaveForm = popupElement.querySelector(".popup__form");

let userName = document.querySelector('.popup__input_form_name');
let jobType = document.querySelector('.popup__input_form_job');
let userInputTitle = document.querySelector('.profile__title');
let jobInputSubtitle = document.querySelector('.profile__describle');


const openPopup = function() {
  userName.value = userInputTitle.textContent;
  jobType.value = jobInputSubtitle.textContent;
  popupElement.classList.add('popup_opened');
}


const closePopup = function() {
  popupElement.classList.remove('popup_opened');
}


const saveButton = function(evt) {
  evt.preventDefault();
  userInputTitle.textContent = userName.value;
  jobInputSubtitle.textContent = jobType.value;
  closePopup();
}


popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupSaveForm.addEventListener('submit', saveButton);
