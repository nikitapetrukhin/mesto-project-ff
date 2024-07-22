function openPopup (popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClosePopup);  
};

function closePopup (popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClosePopup);
  popup.querySelector('.popup__form').reset();
};

function handleEscClosePopup (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
};

export { 
  openPopup, 
  closePopup
};