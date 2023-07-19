export const BASE_URL = 'https://auth.nomoreparties.co';


function checkResponse(res) { return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`) };

export const register = ({ password, email }) => {
  return fetch(`${BASE_URL}/auth/local/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then((res) => checkResponse(res))
};