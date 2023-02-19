const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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

const template = document.querySelector('#item-template').content;
const gallery = document.querySelector('.gallery__list');
const popupOpenImage = document.querySelector('#popup__img');
const popupImage = popupOpenImage.querySelector('.popup__image');
const popupImageCaption = popupOpenImage.querySelector('.popup__caption');
const closeButtonImageOpen = popupOpenImage.querySelector('.popup__close-button');


/* popup редактирования профиля */
/* функция заполнения формы действующими значениями профиля */
const fillFormFromProfile = () => {
  userName.value = userInputTitle.textContent;
  jobType.value = jobInputSubtitle.textContent;
}

/* функция заполнения профиля данными из формы */
const fillProfileFromForm = () => {
  userInputTitle.textContent = userName.value;
  jobInputSubtitle.textContent = jobType.value;
}

/* открыть popup */
const openPopup = (popup) => { popup.classList.add('popup_opened');}
/* закрыть popup */
const closePopup = (popup) => { popup.classList.remove('popup_opened');}
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
  const card = createCard(placeInput.value, linkInput.value);
  addCardToGalery(card);
  closePopup(popupAddNewSight);
  addNewSightForm.reset();
};

// кнопка открыть popup
openAddNewSightButton.addEventListener('click', () => openPopup(popupAddNewSight));
// кнопка закрыть popup
closeButtonSight.addEventListener('click', () => closePopup(popupAddNewSight));
// кнопка создать
addNewSightForm.addEventListener('submit', addNewCard);


/* Galery */
function createCard(name, link) {
  const item = template.querySelector('.gallery__item').cloneNode(true);
  const itemImg = item.querySelector('.gallery__pic');
  const itemTitle = item.querySelector('.gallery__name');
  const like = item.querySelector('.gallery__like');
  const remove = item.querySelector('.gallery__remove');


  itemImg.src = link;
  itemImg.alt = name;
  itemTitle.textContent = name;

  const openImage = () => {
    openPopup(popupOpenImage);
    popupImage.src = link;
    popupImage.alt = name;
    popupImageCaption.textContent = name;
  };

  like.addEventListener('click', () => {like.classList.toggle('gallery__like_on');});
  remove.addEventListener('click', (evt) => {evt.target.closest('.gallery__item').remove();});
  itemImg.addEventListener('click', openImage);
  return item;
};

const addCardToGalery = (card) => {gallery.prepend(card)};

// заполнить галерею
initialCards.forEach(item => {addCardToGalery(createCard(item.name, item.link))});
// закрыть попап просмотра фотографий
closeButtonImageOpen.addEventListener('click', () => closePopup(popupOpenImage));
