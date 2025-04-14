
// Функция создания карточки
function createCard (cardTemplate, cardName, cardLink, deleteCard, likeCard, openImageModal) {
    const cardTemplateClone = cardTemplate.querySelector('.places__item ').cloneNode(true);
    const cardImage = cardTemplateClone.querySelector('.card__image');
    const cardTitle = cardTemplateClone.querySelector('.card__title');
    const deleteButton = cardTemplateClone.querySelector('.card__delete-button');
    const likeButton = cardTemplateClone.querySelector('.card__like-button');

    cardImage.src = cardLink;
    cardImage.alt = cardName;
    cardTitle.textContent = cardName;

    deleteButton.addEventListener('click', () => deleteCard(cardTemplateClone));
    likeButton.addEventListener('click', likeCard);
    cardImage.addEventListener('click', () => {
        openImageModal(cardLink, cardName);
    });
    
    return cardTemplateClone;

};
//  Функция удаления карточки
function deleteCard (card) {
    card.remove();
}
// функция лайка карточки
function likeCard (evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};

export {createCard, deleteCard, likeCard};
