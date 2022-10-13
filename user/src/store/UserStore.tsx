import {makeAutoObservable} from "mobx";
import {AuthService} from "../api/API";
import axios from "axios";
import {baseURL} from "../http/http";
import {IResponse, IUser} from "../types/authTypes";

export default class UserStore {
    constructor() {
        makeAutoObservable(this)
    }

    _isAuth = false;

    get isAuth() {
        return this._isAuth;
    }

    _user = {} as IUser;

    get user() {
        return this._user;
    }

    _isLoading = false;

    get isLoading() {
        return this._isLoading;
    }

    setIsAuth(bool: boolean) {
        this._isAuth = bool;
    }

    setUser(user: IUser) {
        this._user = user;
    }

    setIsLoading(bool: boolean) {
        this._isLoading = bool;
    }

    async registration(email: string, name: string, password: string) {
        try {
            const response = await AuthService.register(email, name, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setIsAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
            return e.response?.data?.message;
        }
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setIsAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
            return e.response?.data?.message;
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setIsAuth(false);
            this.setUser({} as IUser);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        try {
            this.setIsLoading(true);
            const response = await axios.get<IResponse>(`${baseURL}/auth/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            this.setIsAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setIsLoading(false);
        }
    }
};