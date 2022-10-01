import React from 'react';
import Navbar from "./navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import Login from "./login/Login";
import Home from "./home/Home";

const MainPage = () => {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/*'} element={<Home/>}/>
            </Routes>
        </>
    );
};

export default MainPage;