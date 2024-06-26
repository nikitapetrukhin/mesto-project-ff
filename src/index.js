import { initialCards } from './scripts/cards.js';
import './pages/index.css';
import { 
  createCard, 
  deleteCard, 
  handleAddCardForm, 
  likeCard, 
  zoomImg } from './components/card.js';
import { 
  openEditingPopup, 
  openNewCardPopup, 
  handleCloseModal,  
  handleOverlayClosePopup,
  handleEscCloseModal,
  handleFormSubmit,
} from './components/modal.js';

const cardsContainer = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button'); // Edit button for profile popup 
const newCardAddButton = document.querySelector('.profile__add-button'); // Add Button
const editForm = document.querySelector('.popup_type_edit .popup__form');
const addCardForm = document.querySelector('.popup_type_new-card .popup__form');

initialCards.forEach(cardData => {
  const card = createCard(cardData, deleteCard, likeCard, zoomImg);
  cardsContainer.append(card);
});

profileEditButton.addEventListener('click', openEditingPopup);
newCardAddButton.addEventListener('click', openNewCardPopup);

document.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('popup__close')) {
    handleCloseModal(evt);
  } else if (evt.target.classList.contains('card__image')) {
    zoomImg(evt);
  } else if (evt.target.classList.contains('popup')) {
    handleOverlayClosePopup(evt);
  }
});

document.addEventListener('keydown', handleEscCloseModal);

editForm.addEventListener('submit', handleFormSubmit);

addCardForm.addEventListener('submit', function (event) {
  const newCard = handleAddCardForm (event);
  cardsContainer.prepend(newCard);
});
