class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialCards() {   // получить список всех карточек в виде массива (GET)
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(res => this._getResponse(res));
  }

  addCard({name, link}) {   // добавить карточку (POST)
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(res => this._getResponse(res));
  }

  deleteByTrash(cardId) {   // удалить карточку (DELETE)
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => this._getResponse(res));
  }

  getUserInfo() {   // получить данные пользователя (GET)
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(res => this._getResponse(res));
  }

  replaceUserInfo({name, about}) {   // заменить данные пользователя (PATCH)
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(res => this._getResponse(res));
  }

  replaceAvatar({avatar}) { // заменить аватар (PATCH)
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then(res => this._getResponse(res));
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => this._getResponse(res));
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._getResponse(res));
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort36',
  headers: {
    authorization: '91bab0a1-95f4-4e2c-8186-9f03ec8012a1',
    'Content-Type': 'application/json'
  }
});