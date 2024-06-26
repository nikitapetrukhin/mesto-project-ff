const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__description');

function openEditingPopup () {
  const popup = document.querySelector('.popup_type_edit');
  popup.classList.add('popup_is-animated', 'popup_is-opened');
  const name = document.querySelector('.profile__title').textContent;
  const description = document.querySelector('.profile__description').textContent;
  document.querySelector('.popup__input_type_name').placeholder = name;
  document.querySelector('.popup__input_type_description').placeholder = description;
};

function openNewCardPopup () {
  const popup = document.querySelector('.popup_type_new-card');
  popup.classList.add('popup_is-opened', 'popup_is-animated');
}

function handleCloseModal (evt) {
  const popup = evt.target.closest('.popup');
  popup.classList.remove('popup_is-opened');
};

function handleOverlayClosePopup (evt) {
  if (evt.target.classList.contains('popup')) {
    evt.target.classList.remove('popup_is-opened');
  }
};

function handleEscCloseModal (evt) {
  if (evt.key === 'Escape') {
    const escCloseModal = document.querySelectorAll('.popup');
    escCloseModal.forEach(esc => esc.classList.remove('popup_is-opened'));
  }
};

function handleFormSubmit (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  evt.target.reset();
  evt.target.closest('.popup').classList.remove('popup_is-opened');
};

export { 
  openEditingPopup, 
  openNewCardPopup, 
  handleCloseModal, 
  handleOverlayClosePopup, 
  handleEscCloseModal,
  handleFormSubmit,
};