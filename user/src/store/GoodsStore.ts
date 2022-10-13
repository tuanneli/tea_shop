import {makeAutoObservable} from "mobx";
import {ICategory, IItem} from "../types/goodsTypes";
import {AuthService, GoodsService} from "../api/API";

export default class GoodsStore {

    constructor() {
        makeAutoObservable(this);
    }

    _categorySorted = "all";

    get categorySorted() {
        return this._categorySorted;
    }

    _goods = [] as IItem[];

    get goods() {
        return this._goods;
    }

    _categories = [] as ICategory[];

    get categories() {
        return this._categories;
    }

    setCategorySorted(value: string) {
        this._categorySorted = value;
    }

    setGoods(items: IItem[]) {
        this._goods = items;
    }

    setCategories(names: ICategory[]) {
        this._categories = names;
    }

    async getGoods() {
        try {
            const response = await GoodsService.getItems();
            this.setGoods(response.data);
            return response;
        } catch (e: any) {
            console.log(e.response?.data?.message);
            return e.response?.data?.message;
        }
    }

    async getCategories() {
        try {
            const response = await GoodsService.getCategories();
            this.setCategories(response.data);
            return response;
        } catch (e: any) {
            console.log(e.response?.data?.message);
            return e.response?.data?.message;
        }
    }
}