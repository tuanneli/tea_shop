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

    setShoppingCart(ShoppingCart: IShoppingCart[]) {
        this._shoppingCart = ShoppingCart;
    }

    setAmountOfItemsInCart(number: number) {
        this._amountOfItemsInCart = number;
    }

    addAmountOfItemsInCart() {
        return this._amountOfItemsInCart = this._amountOfItemsInCart + 1;
    }

    subtractAmountOfItemsInCart() {
        return this._amountOfItemsInCart = this._amountOfItemsInCart - 1;
    }

    addItemToShoppingCart(name: string, price: string) {
        this.addAmountOfItemsInCart();
        const isInCart = this.shoppingCart.find(item => item.name === name);
        if (isInCart) {
            return this.setShoppingCart(this.shoppingCart.map(item =>
                item.name === name ? {...item, amount: item.amount + 1} : item));
        }
        this.setShoppingCart([...this.shoppingCart, {name, price, amount: 1}]);
    }

    removeItemFromShoppingCart = (name: string) => {
        this.subtractAmountOfItemsInCart();
        this.setShoppingCart(this.shoppingCart.reduce((prev, item) => {
            if (item.name == name) {
                if (item.amount === 1) return prev;
                return [...prev, {...item, amount: item.amount - 1}]
            } else {
                return [...prev, item]
            }
        }, [] as IShoppingCart[]));
    }

    clear() {
        this.setShoppingCart([] as IShoppingCart[]);
        this.setAmountOfItemsInCart(0);
    }
};