import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};
        makeAutoObservable(this)
    }

    _isAuth: boolean;

    get isAuth() {
        return this._isAuth;
    }

    _user: object;

    get user() {
        return this._user;
    }

    setIsAuth(bool: boolean) {
        this._isAuth = bool;
    }

    setUser(user: object) {
        this._user = user;
    }
}