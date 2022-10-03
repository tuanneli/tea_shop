import React from 'react';
import Navbar from "./navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import Login from "./login/Login";
import Home from "./home/Home";
import AddClient from "./add_client/AddClient";
import FindCustomer from "./find_customer/FindCustomer";
import Register from "./login/Register";
import GoodsList from "./goods_list/GoodsList";

const MainPage = () => {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path={'/info'} element={<FindCustomer/>}/>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/addclient'} element={<AddClient/>}/>
                <Route path={'/goodslist'} element={<GoodsList/>}/>
                <Route path={'/*'} element={<Home/>}/>
            </Routes>
        </>
    );
};

export default MainPage;