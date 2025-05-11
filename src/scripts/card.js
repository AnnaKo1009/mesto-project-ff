
import {toDeleteCard, toLikeCard, toDeleteLike} from './api.js';

// Функция создания карточки
export function createCard(cardData, handleDeleteCard, likeCard, cardTemplate, openImageModal, userId) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.like-counter').textContent = cardData.likes.length;
    const cardOwnerId = cardData.owner._id;
    const cardId = cardData._id;
    cardElement.dataset.cardId = cardId;
    
    // проверка есть ли лайк пользователя
    const isUserLiked = cardData.likes.some((like) => like._id === userId);
    if (isUserLiked) {
        likeButton.classList.add('card__like-button_is-active');
    };
    
    //обработчики событий
    if (cardOwnerId === userId) {
        deleteButton.addEventListener('click', (event) => {
            handleDeleteCard(cardId, cardElement); 
        });;
    } else {
        deleteButton.style.display = 'none';
    };
    likeButton.addEventListener('click', likeCard);
    cardImage.addEventListener('click', () => {
        openImageModal(cardData.link, cardData.name);
    });
    
    return {
        'cardElement': cardElement
    };
}

//Функция для обработки удаления карточки
export function handleDeleteCard(cardId, cardElement) {

    // Вызываем API функцию удаления
    toDeleteCard(cardId)  
        .then(() => {
            cardElement.remove();
        })
        .catch(err => {
            console.error('Ошибка при удалении карточки:', err);
            alert('Не удалось удалить карточку');
        });
}


// функция лайка карточки
export function likeCard (event) {
    const likeButton = event.target;
    const likedCard = likeButton.closest('.card');
    const likedCardId = likedCard.dataset.cardId;
    const cardLikeCounter = likedCard.querySelector('.like-counter');
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    const likeMethod = isLiked ? toDeleteLike : toLikeCard;
    likeButton.disabled = true;
    likeMethod(likedCardId) 
            .then ((updatedLikedCard) => { 
                likeButton.classList.toggle('card__like-button_is-active'); 
                cardLikeCounter.textContent = updatedLikedCard.likes.length; 
            }) 
            .catch ((err) => { 
                console.error (`Ошибка при ${isLiked ? "снятии" : "постановке"} лайка:`, err); 
            })
            .finally(() => {
                likeButton.disabled = false;
            });
}
