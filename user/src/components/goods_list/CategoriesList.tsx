import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {ListGroup} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import "./Goods.css";
import Button from "react-bootstrap/Button";
import AddCategory from "./AddCategory";
import {GoodsService} from "../../api/API";
import {ICategory} from "../../types/itemsTypes";

const CategoriesList = () => {

    const {goodsStore} = useContext(Context);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isNew, setIsNew] = useState<boolean>(false);
    const [category, setCategory] = useState<ICategory>();

    const getAllCategories = () => {
        try {
            goodsStore.getCategories();
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getAllCategories();
    }, [isActive])

    const handleDelete = (name: string) => {
        GoodsService.deleteCategory(name).then(() => {
            getAllCategories();
        });
    };

    const handleAdd = () => {
        setIsNew(true);
        setIsActive(true);
    }

    const handleChange = (category: ICategory) => {
        setIsNew(false);
        setIsActive(true);
        setCategory(category);
    }

    return (
        <ListGroup>
            <div className="worker-row">
                <ListGroup.Item
                    className="category-group-item"
                    onClick={() => goodsStore.setCategorySorted("all")}
                    key={"All"}>
                    Все
                </ListGroup.Item>
            </div>
            {goodsStore.categories.map(category =>
                <div className="worker-row" key={category.name}>
                    <ListGroup.Item
                        className="category-group-item"
                        onClick={() => goodsStore.setCategorySorted(category.name)}>
                        {category.name}
                    </ListGroup.Item>
                    <button className={"delete-button"} onClick={() => handleDelete(category.name)}>X
                    </button>
                    <button className={"delete-button"} onClick={() => handleChange(category)}>Изменить
                    </button>
                </div>
            )}
            <Button onClick={handleAdd} variant="outline-dark">Добавить категорию</Button>
            <AddCategory isNew={isNew} show={isActive} setShow={setIsActive} category={category as ICategory}/>
        </ListGroup>
    );
};

export default observer(CategoriesList)