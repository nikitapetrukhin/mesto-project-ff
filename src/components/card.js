import { openPopup } from "./modal";

//const cardTemplate = document.querySelector('#card-template').content;

// function createCard ({ cardData, onDelete, onLikeCard, onOpenPopupData }) {
//   const cardElement = cardTemplate.querySelector('.places__item.card').cloneNode(true);
//   const deleteButton = cardElement.querySelector('.card__delete-button');
//   const cardLikeButton = cardElement.querySelector('.card__like-button');
//   const cardImg = cardElement.querySelector('.card__image');
//   const cardTitle = cardElement.querySelector('.card__title');
//   const cardLikes = cardElement.querySelector('.card__like-count');
  
//   cardImg.src = cardData.link;
//   cardImg.alt = cardData.name;
//   cardTitle.textContent = cardData.name;
//   cardLikes.textContent = cardData.likes.length;

//   cardImg.addEventListener('click', () => {
//     onOpenPopupData(cardData.link, cardData.name);
//   });

//   deleteButton.addEventListener('click', () => {
//     onDelete(cardElement);
//   });

//   cardLikeButton.addEventListener('click', onLikeCard);

//   return cardElement;
// }

const cardTemplate = document.querySelector('#card-template').content;

function createCard ({ cardData, onDelete, onLikeCard, onOpenPopupData }) {
  const cardElement = cardTemplate.querySelector('.places__item.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardImg = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikes = cardElement.querySelector('.card__like-counter');
  
  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikes.textContent = cardData.likes.length;

  cardImg.addEventListener('click', () => {
    onOpenPopupData(cardData.link, cardData.name);
  });

  if (cardData.owner._id !== cardData.ownerId) {
    deleteButton.style.display = 'none';
  }

  if (cardData.likes.length > 0) {
    (cardData.likes).forEach(like => {
      if (like._id === cardData.ownerId) {
        cardLikeButton.classList.add('card__like-button_is-active');
      }
    });
  }

  // deleteButton.addEventListener('click', onDelete);

  deleteButton.addEventListener('click', () => {
    onDelete(cardData._id, cardElement);
  });

  // cardLikeButton.addEventListener('click', onLikeCard);
  cardLikeButton.addEventListener('click', () => {
    onLikeCard(cardData._id, cardElement);
  });

  return cardElement;
}

function displayDeleteCard (element) {
    element.remove();
}

// function displayLikeCard (evt) {
//   evt.target.classList.toggle('card__like-button_is-active');
// };
function displayLikeCard (cardElement) {
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardLikeButton.classList.toggle('card__like-button_is-active');
};

export { 
  createCard, 
  displayDeleteCard,  
  displayLikeCard
};