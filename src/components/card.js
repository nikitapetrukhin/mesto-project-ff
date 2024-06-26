const cardTemplate = document.querySelector('#card-template').content;

function createCard (cardData, onDelete, onLikeCard, onZoomImg) {
  const cardElement = cardTemplate.querySelector('.places__item.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardImg = document.querySelector('.popup_type_image');
  
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').alt = cardData.name;

  deleteButton.addEventListener('click', () => {
    onDelete(cardElement);
  });

  cardLikeButton.addEventListener('click', onLikeCard);
  cardImg.addEventListener('click', onZoomImg);

  return cardElement;
}

function deleteCard (element) {
    element.remove();
}

function likeCard (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};

function zoomImg (evt) {
  const popupImg = document.querySelector('.popup_type_image');
  popupImg.classList.add('popup_is-opened', 'popup_is-animated');
  popupImg.querySelector('.popup__image').src = evt.target.src;
  popupImg.querySelector('.popup__image').alt = evt.target.alt;
};

function handleAddCardForm (evt) {
  const cardNameInput = document.querySelector('.popup__input_type_card-name');
  const cardLinkInput = document.querySelector('.popup__input_type_url');
  const manualCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };
  evt.preventDefault();
  const card = createCard (manualCard, deleteCard, likeCard);
  evt.target.reset();
  evt.target.closest('.popup').classList.remove('popup_is-opened');
  return card;
}

export { 
  createCard, 
  deleteCard, 
  handleAddCardForm, 
  likeCard, 
  zoomImg 
};