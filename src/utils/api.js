class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._authorization = headers.authorization;
  }

  _checkResponse(res) { return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`) };

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._authorization
      }
    })
      .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._authorization
      }
    })
      .then(this._checkResponse)
  };

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    })
      .then(this._checkResponse)
  };


  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
      .then(this._checkResponse)
  }


  updateProfileInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(this._checkResponse)

  };

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization
      }
    }).then(this._checkResponse)
  };

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    }).then(this._checkResponse)
  };

  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data,
      })
    }).then(this._checkResponse)
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '2a145710-3bc0-4bda-81bf-8857fba682fa',
    'Content-Type': 'application/json'
  }
});

export default api;
