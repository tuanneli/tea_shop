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

export interface IContext {
    user: UserStore
}

export const Context = createContext<IContext | null>(null);

root.render(
    <React.StrictMode>
        <Context.Provider value={{
            user: new UserStore()
        }}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Context.Provider>
    </React.StrictMode>
);

reportWebVitals();
