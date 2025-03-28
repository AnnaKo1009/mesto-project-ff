// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard (cardTemplate, cardName, cardLink, deleteCard) {
    const cardTemplateClone = cardTemplate.querySelector('.places__item ').cloneNode(true);
    const cardImage = cardTemplateClone.querySelector('.card__image');
    const cardTitle = cardTemplateClone.querySelector('.card__title');
    const deleteButton = cardTemplateClone.querySelector('.card__delete-button');
    cardImage.src = cardLink;
    cardImage.alt = cardName;
    cardTitle.textContent = cardName;
    deleteButton.addEventListener('click', () => deleteCard(cardTemplateClone));
    return cardTemplateClone;
}
// @todo: Функция удаления карточки
function deleteCard (card) {
    card.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
   const cardName =  item.name;
   const cardLink = item.link;
   const cardItem = createCard(cardTemplate, cardName, cardLink, deleteCard);
   placesList.append(cardItem);
});

