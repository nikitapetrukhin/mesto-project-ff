//import { initialCards } from './scripts/cards.js';
import './pages/index.css';
import { createCard, displayDeleteCard, displayLikeCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { 
  getUserInfo, 
  getInitialCards, 
  editUserInfo, 
  addCard,
  fetchDeleteCard,
  putLike,
  deleteLike,
  patchAvatar,
  checkImgUrl
} from './components/api.js';

const cardsContainer = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');

const profileButton = document.querySelector('.profile__edit-button'); 
const profilePopup = document.querySelector('.popup_type_edit');

const newCardAddButton = document.querySelector('.profile__add-button');
const newCardAddPopup = document.querySelector('.popup_type_new-card');

const popupImg = document.querySelector('.popup_type_image');
const popupImgImage = document.querySelector('.popup__image');
const popupImgCaption = document.querySelector('.popup__caption');

const profileForm = document.forms['edit-profile'];
const profileFormNameInput = profileForm.elements['name'];
const profileFormJobInput = profileForm.elements['description'];

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileImg = document.querySelector('.profile__image');

const addCardForm = document.forms['new-place'];
const addCardFormNameInput = addCardForm.elements['place-name'];
const addCardFormLinkInput = addCardForm.elements['link'];

const confirmationPopup = document.querySelector('.popup_type_confirmation');
const confirmationForm = document.forms['delete-card-confirmation'];

const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');
const editAvatarForm = document.forms['edit-avatar'];
const editAvatarFormLinkInput = editAvatarForm.elements['link'];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

let idCardForDelete = null;
let cardElementForDelete = null;
let userId = null;

// initialCards.forEach(cardData => {
//   renderCard(cardData);
// })

const renderCard = (item, method = "prepend") => {
  const cardDataConfig = {
    onOpenPopupData: openPopupData,
    onDelete: cardDelete,
    onLikeCard: likeCard
  };
  const itemObject = {
    cardData: item
  }
  const card = createCard({ ...itemObject, ...cardDataConfig });
  cardsContainer[method](card);
}

// function handleAddCardForm (evt) {
//   evt.preventDefault();
//   const manualCardData = {
//     name: addCardFormNameInput.value,
//     link: addCardFormLinkInput.value
//   };
//   const card = renderCard(manualCardData);
//   evt.target.reset();
//   clearValidation(addCardForm, validationConfig);
//   closePopup (newCardAddPopup);
//   return card;
// }

// function handleAddCardForm (evt) {
//   evt.preventDefault();
//   addCard(addCardFormNameInput.value, addCardFormLinkInput.value)
//     .then((result) => {
//       const card = renderCard(result);
//       return card;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   evt.target.reset();
//   clearValidation(addCardForm, validationConfig);
//   closePopup (newCardAddPopup);
// }

const handleAddCardForm = (evt) => {
  evt.preventDefault();
  const addCardSubmitButton = evt.submitter;
  addCardSubmitButton.disabled = true; 
  addCardSubmitButton.textContent = 'Сохранение...';
  addCardSubmitButton.style.cursor = 'not-allowed';
  addCard(addCardFormNameInput.value, addCardFormLinkInput.value)
    .then((result) => {
      const card = renderCard({ ...result, ownerId: userId });
      //renderCard({ ...result, ownerId: userId });
      evt.target.reset();
      clearValidation(addCardForm, validationConfig);
      closePopup(newCardAddPopup);
      return card;
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      addCardSubmitButton.disabled = false;
      addCardSubmitButton.textContent = 'Сохранить';
      addCardSubmitButton.style.cursor = 'pointer';
    });
}

// function handleAddCardForm (evt) {
//   evt.preventDefault();
//   addCard(addCardFormNameInput.value, addCardFormLinkInput.value)
//     .then((result) => {
//       console.log(result);
//       const manualCardData = {
//         name: result.name,
//         link: result.link
//       };
//       const card = renderCard(manualCardData);
//       return card;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   evt.target.reset();
//   clearValidation(addCardForm, validationConfig);
//   closePopup (newCardAddPopup);
// }

const openPopupData = (link, name) => {
  popupImgImage.src = link;
  popupImgImage.alt = name;
  popupImgCaption.textContent = name;
  openPopup(popupImg);
};

// function handleProfileFormSubmit (evt) {
//   evt.preventDefault();
//   profileName.textContent = profileFormNameInput.value;
//   profileJob.textContent = profileFormJobInput.value;
//   evt.target.reset();
//   closePopup(profilePopup);
// };

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  const profileFormButton = evt.submitter;
  profileFormButton.disabled = true; 
  profileFormButton.style.cursor = 'not-allowed';
  profileFormButton.textContent = 'Сохранение...';
  editUserInfo(profileFormNameInput.value, profileFormJobInput.value)
    .then((result) => {
      //console.log(result);
      profileName.textContent = result.name;
      profileJob.textContent = result.about;
      evt.target.reset();
      closePopup(profilePopup);
      clearValidation(profileForm, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileFormButton.disabled = false; 
      profileFormButton.textContent = 'Сохранить';
      profileFormButton.style.cursor = 'pointer';
    });
};

const handleEditAvatarForm = (evt) => {
  evt.preventDefault();
  const editAvatarSubmitButton = evt.submitter;
  editAvatarSubmitButton.disabled = true; 
  editAvatarSubmitButton.textContent = 'Сохранение...';
  editAvatarSubmitButton.style.cursor = 'not-allowed';
  patchAvatar(editAvatarFormLinkInput.value)
    .then((result) => {
      profileImg.style.backgroundImage = 'url(' + result.avatar + ')';
      evt.target.reset();
      clearValidation(editAvatarForm, validationConfig);
      closePopup(editAvatarPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editAvatarSubmitButton.disabled = false; 
      editAvatarSubmitButton.textContent = 'Сохранить';
      editAvatarSubmitButton.style.cursor = 'pointer';
    })
}


// const handleEditAvatarForm = (evt) => {
//   evt.preventDefault();
//   patchAvatar(editAvatarFormLinkInput.value)
//     .then((result) => {
//       checkImgUrl(result.avatar)
//         .then((result) => {
//           console.log(result);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

const cardDelete = (cardId, cardElement) => {
  idCardForDelete = cardId;
  cardElementForDelete = cardElement;
  openPopup(confirmationPopup);
};

const likeCard = (cardId, cardElement) => {
  if (cardElement.querySelector('.card__like-button').classList.contains('card__like-button_is-active')) {
    deleteLike(cardId)
      .then((result) => {
        updateCardLikes(cardElement, result.likes.length);
        displayLikeCard(cardElement);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    putLike(cardId)
    .then((result) => {
      updateCardLikes(cardElement, result.likes.length);
      displayLikeCard(cardElement);
    })
    .catch((err) => {
      console.log(err);
    });
  }
};

const updateCardLikes = (cardElement, likes) => {
  const cardLikes = cardElement.querySelector('.card__like-counter');
  cardLikes.textContent = likes;
};

profileButton.addEventListener('click', () => {
  openPopup(profilePopup);
  clearValidation(profileForm, validationConfig);
  profileFormNameInput.value = profileName.textContent;
  profileFormJobInput.value = profileJob.textContent;
});

newCardAddButton.addEventListener('click', () => {
  openPopup(newCardAddPopup);
  clearValidation(addCardForm, validationConfig);
  addCardFormNameInput.value = '';
  addCardFormLinkInput.value = '';
});

profileImg.addEventListener('click', () => {
  openPopup(editAvatarPopup);
  clearValidation(editAvatarForm, validationConfig);
  editAvatarFormLinkInput.value = '';
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

profileForm.addEventListener('submit', handleProfileFormSubmit);
addCardForm.addEventListener('submit', handleAddCardForm); 
editAvatarForm.addEventListener('submit', handleEditAvatarForm);

enableValidation(validationConfig);

Promise.all([getUserInfo(), getInitialCards()])
  .then((results) => {
    userId = results[0]._id;
    console.log(results[1]);
    profileName.textContent = results[0].name;
    profileJob.textContent = results[0].about;
    profileImg.style.backgroundImage = 'url(' + results[0].avatar + ')';
    results[1].forEach(cardData => {
      renderCard({ ...cardData, ownerId: results[0]._id});
      idCardForDelete = cardData._id;
    })
  })
  .catch((err) => {
    console.log(err);
  });

// const cardDelete = (idCardForDelete, cardElement) => {
//   openPopup(confirmationPopup);
//   confirmationForm.addEventListener('submit', (evt) => {
//     evt.preventDefault();
//     fetchDeleteCard(idCardForDelete)
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     closePopup(confirmationPopup);
//     displayDeleteCard(cardElement);
//   });
// };

confirmationForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (idCardForDelete && cardElementForDelete) {
    fetchDeleteCard(idCardForDelete)
      .then((result) => {
        // console.log(result);
        if (result.message === 'Пост удалён') {
          displayDeleteCard(cardElementForDelete);
          idCardForDelete = null;
          cardElementForDelete = null;
        } else {
          console.log(result.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    closePopup(confirmationPopup);
  }
});