const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-38',
    headers: {
      authorization: '59d50f53-0c7f-4cfc-95e6-9d638d29d1c2',
      'Content-Type': 'application/json'
    }
  }


  function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};


// Запрашиваем информацию о пользователе
export function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(checkResponse);
};

// Обновляем информацию о пользователе
export function updateUserInfo(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    .then(checkResponse);
};

// Запрашиваем карточки
export function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(checkResponse);
};

// Добавляем новую карточку
export function addNewCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then(checkResponse);
}

// Удаляем карточку
export function toDeleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(checkResponse);
}

// Обновляем аватарку
export function updateAvatar(avatarUrl) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarUrl
        })
    })
    .then(checkResponse);
};

// Ставим лайк
export function toLikeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(checkResponse);
}

// Удаляем лайк
export function toDeleteLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(checkResponse);
}

