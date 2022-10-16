import React from 'react';
import {Col, Row} from "react-bootstrap";
import GoodsList from "./GoodsList";
import Categories from "./CategoriesList";
import "./Goods.css";

const GoodsPanel = () => {
    return (
        <Row style={{margin: "0", padding: '0'}}>
            <Col md={3}>
                <Categories/>
            </Col>
            <Col md={9}>
                <GoodsList/>
            </Col>
        </Row>
    );
};

export default GoodsPanel;