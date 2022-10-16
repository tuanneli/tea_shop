import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {ListGroup} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {GoodsService} from "../../api/API";
import {ICategory} from "../../types/goodsTypes";
import '../../styles/Scrollbar.css'

const CategoriesList = () => {

    const {goodsStore} = useContext(Context);
    const [isActive, setIsActive] = useState<boolean>(false);

    const getAllCategories = () => {
        try {
            goodsStore.getGoods();
            goodsStore.getCategories();
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getAllCategories();
    }, [isActive])

    return (
        <div className='categories-container'>
            <div className="category-row">
                <div
                    className="category-row-item button-style"
                    onClick={() => goodsStore.setCategorySorted("all")}
                    key={"All"}>
                    Все
                </div>
            </div>
            {goodsStore.categories.map(category =>
                <div className="category-row" key={category.name}>
                    <div
                        className="category-row-item button-style"
                        onClick={() => goodsStore.setCategorySorted(category.name)}>
                        {category.name}
                    </div>
                </div>
            )}
        </div>
    );
};

export default observer(CategoriesList)