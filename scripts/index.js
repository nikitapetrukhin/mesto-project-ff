const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

function createCard (cardData, callback) {
  const cardElement = cardTemplate.querySelector('.places__item.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').alt = cardData.name;

  deleteButton.addEventListener('click', () => {
    callback(cardElement);
  })
  return cardElement;
}

function deleteCard (element) {
    element.remove();
}

initialCards.forEach(cardData => {
  const card = createCard(cardData, deleteCard);
  cardsContainer.append(card);
})