//  импортируем стили
import './pages/index.css';

//  импортируем данные карточек
import {initialCards} from './scripts/cards.js';

//  импортируем функции карточки 
import {createCard, handleDeleteCard, likeCard} from './scripts/card.js';

// импортируем функции модальных окон
import { openModal, closeModal, addCloseListener} from './scripts/modal.js'

// импортируем функции для валидации
import {enableValidation, clearValidation} from './scripts/validation.js';

import {getUserInfo, updateUserInfo, updateAvatar, getCards, addNewCard} from './scripts/api.js';

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Создаем переменную с айди пользователя
let userId;

// Валидация данных
enableValidation(validationConfig);

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

// работа с аватаром
const profileImage = document.querySelector('.profile__image');
const editAvatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = document.forms['edit-avatar'];
const avatarInputUrl = avatarForm.querySelector('.popup__input_type_url');

// Функции 
//  Вывести карточки на страницу
function addCard (placesList, card) {
  placesList.append(card);
}

// информация о себе
function updateProfileInfo(profileTitle, profileDescription, nameInput, jobInput) {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// редактирование и сохранение информации о себе, API
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...'

  updateUserInfo(nameInput.value, jobInput.value)
    .then((updatedUser) => {
      profileTitle.textContent = updatedUser.name;
      profileDescription.textContent = updatedUser.about;
      closeModal(popupEditProfile);
    })
    .catch((err) => {
      console.error('Ошибка при обновлении профиля:', err);
    }) 
    .finally(() => {
      submitButton.textContent = initialText;
    });
};

// функция добавления информации о месте (для новой карточки) в форму, API
function handleNewPlaceForm(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;

  addNewCard(placeNameInput.value, placeLinkInput.value) 
    .then((cardData) => {
      const newCard = createCard(cardData, handleDeleteCard, likeCard, cardTemplate, openImageModal, userId);
      placesList.prepend(newCard);
      closeModal(popupNewCard);
      editPlaceForm.reset();
    })
    .catch(err => {
      console.error('Ошибка при обновлении профиля:', err);
    })
    .finally(() => {
    submitButton.textContent = initialText;
    submitButton.disabled = false;
  })
}

// изменение аватара, API
function changeAvatar(evt) {
  evt.preventDefault();
  const newAvatarUrl = avatarInputUrl.value;

  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;

  updateAvatar(newAvatarUrl)
    .then((userData) => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      avatarForm.reset();
      closeModal(editAvatarPopup);
    })
    .catch((err) => {
      console.error('Ошибка при обновлении аватара:', err);
    })
    .finally(() => {
      submitButton.textContent = initialText;
      submitButton.disabled = false;
    });
}

// функция открытия модальных окон
function openImageModal(imageUrl, captionText) {
  imgElement.src = imageUrl;
  imgElement.alt = captionText;
  imgCaption.textContent = captionText;
  
  openModal(popupImage);
}

// Промис для вывода данных страницы
Promise.all ([getUserInfo(), getCards()])
    .then(([userData, cardsData]) => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.style.backgroundImage = `url(${userData.avatar})`;
        userId = userData._id;
        cardsData.forEach(card => {
            const newCard = createCard(card, handleDeleteCard, likeCard, cardTemplate, openImageModal, userId).cardElement;
            addCard(placesList, newCard);
        });
    })
    .catch(err => {
        console.error('Ошибка при загрузке данных:', err);
    });

// Открытие и закрытие модальных окон редактирования профиля
 profileEditButton.addEventListener('click', () => {
    updateProfileInfo(profileTitle, profileDescription, nameInput, jobInput);
    clearValidation(editProfileForm, validationConfig);
    openModal(popupEditProfile); 
  });
  addCloseListener(popupEditProfile);

// вызов функции редактирования профиля
editProfileForm.addEventListener('submit', handleProfileFormSubmit);

//Открытие и закрытие окна смены аватарки
profileImage.addEventListener('click', () => {
  // clearValidation(avatarForm, validationConfig);
  avatarForm.reset();
  openModal(editAvatarPopup);
});
addCloseListener(editAvatarPopup);

// Вызов функции изменения аватара
avatarForm.addEventListener('submit', changeAvatar);

// Открытие и закрытие окон добавления карточки
addCardButton.addEventListener('click', () => {
    editPlaceForm.reset(); // Сбрасываем форму
    clearValidation(editPlaceForm, validationConfig);
    openModal(popupNewCard);
  });
addCloseListener(popupNewCard);

// Вызов функции добавления новой карточки с местом
editPlaceForm.addEventListener('submit', handleNewPlaceForm);

// Просмотр карточки
addCloseListener(popupImage);






