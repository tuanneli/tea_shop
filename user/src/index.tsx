import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import UserStore from "./store/UserStore";
import GoodsStore from "./store/GoodsStore";
import CustomerStore from "./store/CustomerStore";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

export interface IStore {
    userStore: UserStore,
    goodsStore: GoodsStore,
    customerStore: CustomerStore,
}

const userStore = new UserStore();
const goodsStore = new GoodsStore();
const customerStore = new CustomerStore();

export const Context = createContext<IStore>({
    userStore,
    goodsStore,
    customerStore,
});

root.render(
    <Context.Provider value={{
        userStore,
        goodsStore,
        customerStore,
    }}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Context.Provider>
);

reportWebVitals();
