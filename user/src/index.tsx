import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import UserStore from "./store/UserStore";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

export interface IUserStore {
    userStore: UserStore
}

const userStore = new UserStore();

export const Context = createContext<IUserStore>({
    userStore
});

root.render(
    <Context.Provider value={{
        userStore
    }}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Context.Provider>
);

reportWebVitals();
