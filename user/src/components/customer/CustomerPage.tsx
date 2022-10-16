import React, {useContext, useEffect} from 'react';
import {Context} from "../../index";
import {Col, Row} from "react-bootstrap";
import CustomerInfo from "./CustomerInfo";
import CustomerGoods from "./CustomerGoods";
import ShoppingCart from "./ShoppingCart";
import {observer} from "mobx-react-lite";
import {Route, Routes, useNavigate} from "react-router-dom";
import FindCustomer from "./FindCustomer";

const CustomerPage = () => {

    const {customerStore} = useContext(Context);

    if (!customerStore.isFound) {
        return (
            <FindCustomer/>
        );
    }

    return (
        <Row style={{margin: "0", padding: '0'}}>
            <Col className='col-md-3 p-0'>
                <CustomerInfo/>
            </Col>
            <Col className='col-md-3 p-0'>
                <ShoppingCart/>
            </Col>
            <Col className='col-md-6 p-0'>
                <CustomerGoods/>
            </Col>
        </Row>
    );
};

export default observer(CustomerPage);