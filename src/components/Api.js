class Api {
  constructor(setting) {
    this._url = setting.url;
    this._headers = setting.headers;
  }

  // проверка запросов
  _responseStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  // загрузка информации о пользователе
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
    .then(this._responseStatus);
  };

  // загрузка карточек
  getItemInfo() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    })
    .then(this._responseStatus);
  };

  // замена данных пользователя
  patchUserInfo(userInfo) {
    return fetch(`${this._url}/users/me/`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.job,
      })
    })
    .then(this._responseStatus);
  };

  // добавление новой карточки
  postNewCard(item) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        link: item.link,
        name: item.name,
      })
    })
    .then(this._responseStatus);
  };

   // работа с лайками
  putLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._responseStatus);
  };

  deleteLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._responseStatus);
  };

  // удаление карточки
  deleteItemCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._responseStatus);
  };

  // аватар
  patchUserAvatar(item) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: item.avatar
      })
    }).then(this._checkResponse);
  };

}

export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '3e20d3f6-0c12-4cc8-983e-21b8af59f059',
    'Content-Type': 'application/json'
  }
});