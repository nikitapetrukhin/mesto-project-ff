function closePopup (popup) {
  popup.classList.remove('popup_is-opened');
};

function openPopup (popup) {
  popup.classList.add('popup_is-opened');

  function handleEscClosePopup (evt) {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
    document.removeEventListener('keydown', handleEscClosePopup);
  };
  document.addEventListener('keydown', handleEscClosePopup);
};

export { 
  openPopup, 
  closePopup
};