const AVATAR_EP = '/users/me/avatar';
const USERS_EP = '/users/me';
const CARDS_EP = '/cards';
const SIGN_UP_EP = 'signup';
const SIGN_IN_EP = 'signin';

class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        this._get = this._get.bind(this);
        this._patch = this._patch.bind(this);
        this._post = this._post.bind(this);
        this._put = this._put.bind(this);
        this._delete = this._delete.bind(this);
    }

    _checkResponse(res) {
        if (res && res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _rejectPromise() {
        return Promise.reject(`Ошибка`);
    }

    _get(ep) {
        return fetch(this._baseUrl + ep, {
            headers: this._headers
        }).then(this._checkResponse).catch(this._rejectPromise);
    }

    _getWithJwt(ep, jwt) {
        return fetch(this._baseUrl + ep, {
            headers: {...this._headers, "Authorization": `Bearer ${jwt}`}
        }).then(this._checkResponse).catch(this._rejectPromise);
    }

    _patch(ep, data) {
        return fetch(this._baseUrl + ep, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(data)
        }).then(this._checkResponse).catch(this._rejectPromise);
    }

    _post(ep, data) {
        return fetch(this._baseUrl + ep, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(data)
        }).then(this._checkResponse).catch(this._rejectPromise);
    }

    _put(ep) {
        return fetch(this._baseUrl + ep, {
            headers: this._headers,
            method: 'PUT',
        }).then(this._checkResponse).catch(this._rejectPromise);
    }

    _delete(ep) {
        return fetch(this._baseUrl + ep, {
            headers: this._headers,
            method: 'DELETE',
        }).then(this._checkResponse).catch(this._rejectPromise);
    }

    getInitialCards() {
        return this._get(CARDS_EP);
    }

    getUserInfo() {
        return this._get(USERS_EP);
    }

    patchUserInfo(data) {
        return this._patch(USERS_EP, data);
    }

    patchAvatar(data) {
        return this._patch(AVATAR_EP, data);
    }

    postCard(data) {
        return this._post(CARDS_EP, data);
    }

    deleteCard(cardId) {
        return this._delete(CARDS_EP + `/${cardId}`, cardId);
    }

    putCardLikes(cardId) {
        return this._put(`${CARDS_EP}/${cardId}/likes`, cardId);
    }

    deleteCardLikes(cardId) {
        return this._delete(`${CARDS_EP}/${cardId}/likes`, cardId);
    }

    postSignUp(data) {
        return this._post(SIGN_UP_EP, data);
    }

    postSignIn(data) {
        return this._post(SIGN_IN_EP, data);
    }

    getMe(jwt) {
        return this._getWithJwt('users/me', jwt);
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46',
    headers: {
        authorization: 'c330429b-3b89-464c-a07c-3bb6ae16281d',
        'Content-Type': 'application/json'
    }
});
export const auth = new Api({
    baseUrl: 'https://auth.nomoreparties.co/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});
export default api;