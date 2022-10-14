import axios, {AxiosError, AxiosResponse} from "axios";
import {$host, baseURL} from "../http/http";
import {IResponse, IUser} from "../types/authTypes";
import {ICategory, ICreateItem, IItem} from "../types/goodsTypes";
import {ICustomer, IOrders} from "../types/customerTypes";

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
    static async createItem({name, price, inStock, inAction, category}: ICreateItem): Promise<AxiosResponse<IItem>> {
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

    static async changeItem({
                                _id,
                                name,
                                price,
                                inStock,
                                inAction,
                                category
                            }: ICreateItem): Promise<AxiosResponse<IItem>> {
        return $host.put<IItem>(`${baseURL}/goods/changeitem`, {_id, name, price, inStock, inAction, category});
    }

    static async getCategories(): Promise<AxiosResponse<ICategory[]>> {
        return $host.get<ICategory[]>(`${baseURL}/goods/getcategories`);
    }

    static async createCategory(name: string): Promise<AxiosResponse<ICategory>> {
        return $host.post<ICategory>(`${baseURL}/goods/addcategory`, {name});
    }

    static async changeCategory(_id: string, name: string): Promise<AxiosResponse<ICategory>> {
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

export class CustomerService {
    static async registerCustomer(name: string, phone: string): Promise<AxiosResponse<ICustomer>> {
        return $host.post<ICustomer>(`${baseURL}/customer/register`, {name, phone});
    }

    static async findCustomer(phone: string): Promise<AxiosResponse<ICustomer>> {
        return $host.post<ICustomer>(`${baseURL}/customer/findone`, {phone});
    }

    static async findCustomers(): Promise<AxiosResponse<ICustomer[]>> {
        return $host.get<ICustomer[]>(`${baseURL}/customer/findall`);
    }

    static async addOrders(orders: IOrders[], total: number, phone: string): Promise<AxiosResponse<ICustomer>> {
        return $host.put<ICustomer>(`${baseURL}/customer/addorders`, {orders, total, phone});
    }
}