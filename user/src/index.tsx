import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import UserStore from "./store/UserStore";
import GoodsStore from "./store/GoodsStore";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

export interface IStore {
    userStore: UserStore,
    goodsStore: GoodsStore,
}

const userStore = new UserStore();
const goodsStore = new GoodsStore();

export const Context = createContext<IStore>({
    userStore,
    goodsStore,
});

root.render(
    <Context.Provider value={{
        userStore,
        goodsStore
    }}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Context.Provider>
);

reportWebVitals();
