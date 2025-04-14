//  импортируем стили
import './pages/index.css';

//  импортируем данные карточек
import {initialCards} from './scripts/cards.js';

//  импортируем функции карточки 
import {createCard, deleteCard, likeCard} from './scripts/card.js';

// импортируем функции модальных окон
import { openModal, closeModal, addCloseListener} from './scripts/modal.js'

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// константы для открытия модальных окон
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const cardImage = cardTemplate.querySelector('.card__image');

// константы для слушателя событий
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

// работа с формами и полями
const editProfileForm = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// добавление карточек через форму
const editPlaceForm = document.forms['new-place'];
const placeNameInput = document.querySelector('.popup__input_type_card-name');
const placeLinkInput = document.querySelector('.popup__input_type_url');
const imgElement = popupImage.querySelector('.popup__image');
const imgCaption = popupImage.querySelector('.popup__caption');

//  Вывести карточки на страницу
initialCards.forEach(function (item) {
    const cardName =  item.name;
    const cardLink = item.link;
    const cardItem = createCard(cardTemplate, cardName, cardLink, deleteCard, likeCard, openImageModal);
    placesList.append(cardItem);
 });

// вызываем открытие модальных окон
 profileEditButton.addEventListener('click', () => {
    openModal(popupEditProfile);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  });

addCardButton.addEventListener('click', () => {
    openModal(popupNewCard);
  });


function openImageModal(link, name) {
    imgElement.src = link;
    imgElement.alt = name;
    imgCaption.textContent = name;
    
    openModal(popupImage);
}

addCloseListener(popupEditProfile);
addCloseListener(popupNewCard);
addCloseListener(popupImage);


// редактирование информации о себе
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(popupEditProfile);
};

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

// добавление информации о месте в форму
function handleNewPlaceForm(evt) {
    evt.preventDefault();
    const cardName = placeNameInput.value;
    const cardLink = placeLinkInput.value;
    const newCard = createCard(cardTemplate, cardName, cardLink, deleteCard, likeCard, openImageModal);
    placesList.prepend(newCard);
    closeModal(popupNewCard);
    editPlaceForm.reset();
}

editPlaceForm.addEventListener('submit', handleNewPlaceForm);
