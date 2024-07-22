const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-18',
  headers: {
    authorization: 'caaf307b-eb72-49d3-84fe-73df9e936b42',
    'Content-Type': 'application/json'
  }
}

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const handleError = (err) => {
  console.log(err);
  return Promise.reject(err); // чтобы можно было обрабатывать ошибку вне функции
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(err => console.log(err));
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    }
  })
    .then(res => {
      if (res.ok) {
        //console.log(res.json());
        return res.json();
      }
    })
    .catch(err => console.log(err));
};

export const editUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
    body: JSON.stringify({
      name,
      about
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
        //console.log(res.json());
      }
    })
    .catch(err => console.log(err));
};

export const addCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
    body: JSON.stringify({
      name,
      link
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
        //console.log(res.json());
      }
    })
    .catch(err => console.log(err));
};

export const fetchDeleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(handleResponse)
    .catch(handleError);
};

export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(handleResponse)
    .catch(handleError);
};

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(handleResponse)
    .catch(handleError);
};

export const patchAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
    body: JSON.stringify({
      avatar
    })
  })
    .then(handleResponse)
    .catch(handleError);
}

export const checkImgUrl = (url) => {
  return fetch(url, {
    method: 'HEAD',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    }
  })
    .then(handleResponse)
    .catch(handleError);
}