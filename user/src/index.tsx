import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import UserStore from "./store/UserStore";
import GoodsStore from "./store/GoodsStore";
import CustomerStore from "./store/CustomerStore";
import ShoppingCartStore from "./store/ShoppingCartStore";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

export interface IStore {
    userStore: UserStore,
    goodsStore: GoodsStore,
    customerStore: CustomerStore,
    shoppingCartStore: ShoppingCartStore,
}

const userStore = new UserStore();
const goodsStore = new GoodsStore();
const customerStore = new CustomerStore();
const shoppingCartStore = new ShoppingCartStore();

export const Context = createContext<IStore>({
    userStore,
    goodsStore,
    customerStore,
    shoppingCartStore,
});

root.render(
    <Context.Provider value={{
        userStore,
        goodsStore,
        customerStore,
        shoppingCartStore,
    }}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Context.Provider>
);

reportWebVitals();
