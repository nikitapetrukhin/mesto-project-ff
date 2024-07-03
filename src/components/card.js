const cardTemplate = document.querySelector('#card-template').content;

function createCard ({ cardData, onDelete, onLikeCard, onOpenPopupData }) {
  const cardElement = cardTemplate.querySelector('.places__item.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardImg = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  
  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  cardImg.addEventListener('click', () => {
    onOpenPopupData(cardData.link, cardData.name);
  });

  deleteButton.addEventListener('click', () => {
    onDelete(cardElement);
  });

  cardLikeButton.addEventListener('click', onLikeCard);

  return cardElement;
}

function deleteCard (element) {
    element.remove();
}

function likeCard (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};

export { 
  createCard, 
  deleteCard,  
  likeCard
};