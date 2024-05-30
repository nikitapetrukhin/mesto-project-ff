const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

function createCard (imgSrc, cardTitle) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  
  cardElement.querySelector('.card__image').src = imgSrc;
  cardElement.querySelector('.card__title').textContent = cardTitle;

  cardsList.append(cardElement);
  deleteButton.addEventListener('click', function(evt) {
    deleteCard(evt);
  })
    // const elem = deleteButton.closest('.card');
    // elem.remove();
}

initialCards.forEach(card => {
  createCard(card.link, card.name);
})

function deleteCard (event) {
  event.target.closest('.card').remove();
}




// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// const cardList = document.querySelector('.places__list');

// function createCard (imgSrc, cardTitle, deleteCard) {
//   const cardTemplate = document.querySelector('#card-template').content;
//   const cardElement = cardTemplate.querySelector('.places__item.card').cloneNode(true);
//   const deleteButton = cardElement.querySelector('.card__delete-button');

//   cardElement.querySelector('.card__image').src = imgSrc;
//   cardElement.querySelector('.card__title').textContent = cardTitle;

//   cardList.append(cardElement);
//   deleteButton.addEventListener('click', () => deleteCard(cardElement));
// }

// initialCards.forEach(card => {
//   createCard(card.link, card.name, deleteCard);
// })

// function deleteCard (listItem) {
//   listItem.remove();
// }