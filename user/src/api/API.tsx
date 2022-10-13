import axios, {AxiosError, AxiosResponse} from "axios";
import {$host, baseURL} from "../http/http";
import {IResponse, IUser} from "../types/authTypes";
import {ICategory, IItem} from "../types/itemsTypes";

export class AuthService {
    static async register(email: string, name: string, password: string): Promise<AxiosResponse<IResponse>> {
        return $host.post<IResponse>(`${baseURL}/auth/registration`, {email, name, password});
    }

    static async login(email: string, password: string): Promise<AxiosResponse<IResponse>> {
        return $host.post<IResponse>(`${baseURL}/auth/login`, {email, password});
    }

    static async logout(): Promise<void> {
        return $host.post(`${baseURL}/auth/logout`);
    }
}

export class UsersService {
    static async getUsers(): Promise<AxiosResponse<IUser[]>> {
        return $host.get<IUser[]>(`${baseURL}/auth/users`);
    }

    static async deleteUser(email: string): Promise<void> {
        return $host.delete(`${baseURL}/auth/delete`, {
            data: {
                email
            }
        })
    }
}

export class GoodsService {
    static async createItem({name, price, inStock, inAction, category}: IItem): Promise<AxiosResponse<IItem>> {
        return $host.post<IItem>(`${baseURL}/goods/additem`, {name, price, inStock, inAction, category});
    }

    static async getItems(): Promise<AxiosResponse<IItem[]>> {
        return $host.get<IItem[]>(`${baseURL}/goods/getitems`);
    }

    static async getItem(name: string): Promise<AxiosResponse<IItem>> {
        return $host.get<IItem>(`${baseURL}/goods/getitem`);
    }

    static async deleteItem(name: string): Promise<AxiosResponse<string>> {
        return $host.delete<string>(`${baseURL}/goods/deleteitem`, {
            data: {
                name
            }
        });
    }

    static async changeItem({_id, name, price, inStock, inAction, category}: IItem): Promise<AxiosResponse<IItem>> {
        return $host.put<IItem>(`${baseURL}/goods/changeitem`, {_id, name, price, inStock, inAction, category});
    }

    static async getCategories(): Promise<AxiosResponse<ICategory[]>> {
        return $host.get<ICategory[]>(`${baseURL}/goods/getcategories`);
    }

    static async createCategory(name: string): Promise<AxiosResponse<ICategory>> {
        return $host.post<ICategory>(`${baseURL}/goods/addcategory`, {name});
    }

    static async changeCategory(_id: string, name: string): Promise<AxiosResponse<ICategory>> {
        console.log(_id, name);
        return $host.put<ICategory>(`${baseURL}/goods/changecategory`, {_id, name});
    }

    static async deleteCategory(name: string): Promise<AxiosResponse<string>> {
        return $host.delete<string>(`${baseURL}/goods/deletecategory`, {
            data: {
                name
            }
        });
    }
}