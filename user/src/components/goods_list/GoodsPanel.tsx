import React from 'react';
import {Col, Row} from "react-bootstrap";
import GoodsList from "./GoodsList";
import Categories from "./CategoriesList";
import "./Goods.css";

const GoodsPanel = () => {
    return (
        <Row className="p-2">
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