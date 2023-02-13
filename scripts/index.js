/* popup редактирования профиля */
const popupElement = document.querySelector('#popup__profile');
const popupOpenButton = document.querySelector('.profile__edit');
const popupCloseButton = popupElement.querySelector('.popup__close-button');
const popupSaveForm = popupElement.querySelector("#profile_form");

let userName = document.querySelector('.popup__input_form_name');
let jobType = document.querySelector('.popup__input_form_job');
let userInputTitle = document.querySelector('.profile__title');
let jobInputSubtitle = document.querySelector('.profile__describle');

/* функция заполнения формы действующими значениями профиля */
const checkProfile = () => {
  userName.value = userInputTitle.textContent;
  jobType.value = jobInputSubtitle.textContent;
}

/* функция заполнения профиля данными из формы */
const fillProfile = () => {
  userInputTitle.textContent = userName.value;
  jobInputSubtitle.textContent = jobType.value;
}

/* открыть popup */
const openPopup = () => { popupElement.classList.add('popup_opened');}
/* закрыть popup */
const closePopup = () => { popupElement.classList.remove('popup_opened');}
/* обработчик нажатия на кнопку - edit */
const editButton = () => { checkProfile(); openPopup();}
/* обработчик нажатия на кнопку - Сохранить */
const saveButton = (evt) => { evt.preventDefault(); fillProfile(); closePopup();}

/* активация */
popupOpenButton.addEventListener('click', editButton);
popupCloseButton.addEventListener('click', closePopup);
popupSaveForm.addEventListener('submit', saveButton);


/* Добавить карточку через popup */
const popupAddNewSight = document.querySelector("#popup__sight");
const popupAddButton = document.querySelector('.profile__add');
const closeButtonSight = popupAddNewSight.querySelector('.popup__close-button');
const createButtonSight = popupAddNewSight.querySelector('.popup__button-save');


let placeInput = popupAddNewSight.querySelector(".popup__input_form_place");
let linkInput = popupAddNewSight.querySelector(".popup__input_form_link");


const openButtonSight = () => {popupAddNewSight.classList.add('popup_opened');};
const closeSight = () => { popupAddNewSight.classList.remove('popup_opened');};
const AddSight = (evt) => {
  evt.preventDefault();

  const addPhoto = {  
    name: placeInput.value,
    link: linkInput.value
  };

  createItem(addPhoto);
  closeSight ();

  placeInput.value = '';
  linkInput.value = '';  
};

// открыть popup
popupAddButton.addEventListener('click', openButtonSight);
// кнопка закрыть
closeButtonSight.addEventListener('click', closeSight);
// кнопка создать
createButtonSight.addEventListener('click', AddSight);


/* Galery */
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

const template = document.querySelector('#item-template').content;
const gallery = document.querySelector('.gallery__list');
const popupImageOpen = document.querySelector('#popup__img');
const popupImage = popupImageOpen.querySelector('.popup__image');
const popupImageCaption = popupImageOpen.querySelector('.popup__caption');

const createItem = ({name, link}) => {
  const item = template.querySelector('.gallery__item').cloneNode(true);
  const itemImg = item.querySelector('.gallery__pic');
  const itemTitle = item.querySelector('.gallery__name');
  const like = item.querySelector('.gallery__like');
  const remove = item.querySelector('.gallery__remove');

  itemImg.src = link;
  itemImg.alt = name;
  itemTitle.textContent = name;
  gallery.prepend(item);

  like.addEventListener('click', () => { like.classList.toggle('gallery__like_on');});
  remove.addEventListener('click', (evt) => { evt.target.closest('.gallery__item').remove();});
}

const addItem = initialCards.forEach((name, link) => { createItem(name, link);});

// открытие попапа с картинкой нереализовано
const popupImg = document.querySelector('#popup__img');
const galleryItem = document.querySelector('.gallery__item');


/* открыть popup */
const openPopupImg = () => { popupImg.classList.add('popup_opened');};


// открыть popup
galleryItem.addEventListener('click', openPopupImg);