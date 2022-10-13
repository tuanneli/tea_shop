import {makeAutoObservable} from "mobx";
import {useState} from "react";
import {IShoppingCart} from "../types/customerTypes";

export default class ShoppingCartStore {
    constructor() {
        makeAutoObservable(this);
    }

    _shoppingCart = [] as IShoppingCart[];

    get shoppingCart() {
        return this._shoppingCart;
    }

    _amountOfItemsInCart = 0;

    get amountOfItemsInCart() {
        return this._amountOfItemsInCart;
    }

    addAmountOfItemsInCart() {
        return this._amountOfItemsInCart = this._amountOfItemsInCart + 1;
    }

    subtractAmountOfItemsInCart() {
        return this._amountOfItemsInCart = this._amountOfItemsInCart - 1;
    }

    addItemToShoppingCart(name: string, price: string) {
        this.addAmountOfItemsInCart();
        const isInCart = this._shoppingCart.find(item => item.name === name);
        if (isInCart) {
            return this._shoppingCart = this._shoppingCart.map(item =>
                item.name === name ? {...item, amount: item.amount + 1} : item)
        }
        this._shoppingCart = [...this._shoppingCart, {name, price, amount: 1}]
    }

    removeItemFromShoppingCart = (name: string) => {
        this.subtractAmountOfItemsInCart();
        this._shoppingCart = this._shoppingCart.reduce((prev, item) => {
            if (item.name == name) {
                if (item.amount === 1) return prev;
                return [...prev, {...item, amount: item.amount - 1}]
            } else {
                return [...prev, item]
            }
        }, [] as IShoppingCart[])
    }

    clear() {
        this._amountOfItemsInCart = 0;
        this._shoppingCart = [] as IShoppingCart[];
    }
};