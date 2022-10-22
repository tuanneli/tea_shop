import React, {useContext, useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "./login/Login";
import AddClient from "./customer/add_find_customer/AddCustomer";
import FindCustomer from "./customer/add_find_customer/findCustomer/FindCustomer";
import Register from "./login/Register";
import Workers from "./workers/Workers";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import GoodsPanel from "./goods_list/GoodsPanel";
import CustomerPage from "./customer/CustomerPage";
import Navbar from "./navbar/Navbar";

const MainPage = observer(() => {

    const {userStore} = useContext(Context);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            userStore.checkAuth();
        }
    }, [])

    if (userStore.isLoading) {
        return (
            <>
                <div>Загрузка...</div>
            </>
        );
    }

    const logout = () => {
        setTimeout(() => {
            userStore.logout();
        }, 5000)
    }

    if (userStore.isAuth && !userStore.user.isActivated) {
        logout();
        return (
            <div className='w-100 h-100 d-flex justify-content-center align-items-center text-center'>
                <h1 className='text-white'>
                    Ваш аакаунт ещё не активирован.
                    Пожалуйста попросите администратора подтвердить ваш аккаунт.
                </h1>
            </div>
        );
    }

    return (
        <>
            {/*{!userStore.isAuth ?*/}
            {/*    <>*/}
            {/*        <Routes>*/}
            {/*            <Route path={'/login'} element={<Login/>}/>*/}
            {/*            <Route path={'/register'} element={<Register/>}/>*/}
            {/*            <Route path={'/*'} element={<Login/>}/>*/}
            {/*        </Routes>*/}
            {/*    </>*/}
            {/*    :*/}
            <>
                <Navbar/>
                {userStore.user.roles && userStore.user.roles[0] === 'ADMIN' ?
                    <Routes>
                        <Route path={'/findCustomer'} element={<FindCustomer/>}/>
                        <Route path={'/register'} element={<Register/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/addclient'} element={<AddClient/>}/>
                        <Route path={'/goodslist'} element={<GoodsPanel/>}/>
                        <Route path={'/workers'} element={<Workers/>}/>
                        <Route path={'/customer'} element={<CustomerPage/>}/>
                        <Route path={'/*'} element={<FindCustomer/>}/>
                    </Routes>
                    :
                    <Routes>
                        <Route path={'/findCustomer'} element={<FindCustomer/>}/>
                        <Route path={'/register'} element={<Register/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/addclient'} element={<AddClient/>}/>
                        <Route path={'/customer'} element={<CustomerPage/>}/>
                        <Route path={'/*'} element={<FindCustomer/>}/>
                    </Routes>
                }
            </>
            {/*}*/}
        </>
    );
});

export default MainPage;