import { initialCards } from './scripts/cards.js';
import './pages/index.css';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';

const cardsContainer = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');

const profileEditButton = document.querySelector('.profile__edit-button'); 
const profileEditPopup = document.querySelector('.popup_type_edit');

const newCardAddButton = document.querySelector('.profile__add-button');
const newCardAddPopup = document.querySelector('.popup_type_new-card');

const popupImg = document.querySelector('.popup_type_image');
const popupImgImage = document.querySelector('.popup__image');
const popupImgCaption = document.querySelector('.popup__caption');

const profileEditForm = document.forms['edit-profile'];
const profileEditFormNameInput = profileEditForm.elements['name'];
const profileEditFormJobInput = profileEditForm.elements['description'];
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__description');

const addCardForm = document.forms['new-place'];
const addCardFormNameInput = addCardForm.elements['place-name'];
const addCardFormLinkInput = addCardForm.elements['link'];

initialCards.forEach(cardData => {
  renderCard(cardData);
})

function renderCard (item, method = "prepend") {
  const cardDataConfig = {
    onOpenPopupData: openPopupData,
    onDelete: deleteCard,
    onLikeCard: likeCard
  };
  const itemObject = {
    cardData: item
  }
  const card = createCard({ ...itemObject, ...cardDataConfig });
  cardsContainer[method](card);
}

function handleAddCardForm (evt) {
  evt.preventDefault();
  const manualCardData = {
    name: addCardFormNameInput.value,
    link: addCardFormLinkInput.value
  };
  const card = renderCard(manualCardData);
  evt.target.reset();
  closePopup (newCardAddPopup);
  return card;
}

function openPopupData (link, name) {
  popupImgImage.src = link;
  popupImgImage.alt = name;
  popupImgCaption.textContent = name;
  openPopup(popupImg);
};

function handleProfileEditFormSubmit (evt) {
  evt.preventDefault();
  nameProfile.textContent = profileEditFormNameInput.value;
  jobProfile.textContent = profileEditFormJobInput.value;
  evt.target.reset();
  closePopup(profileEditPopup);
};

profileEditButton.addEventListener('click', () => {
  openPopup(profileEditPopup);
  profileEditFormNameInput.value = nameProfile.textContent;
  profileEditFormJobInput.value = jobProfile.textContent;
});

newCardAddButton.addEventListener('click', () => {
  openPopup(newCardAddPopup);
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closePopup(evt.target);
    }
    else if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
});

profileEditForm.addEventListener('submit', handleProfileEditFormSubmit);
addCardForm.addEventListener('submit', handleAddCardForm); 