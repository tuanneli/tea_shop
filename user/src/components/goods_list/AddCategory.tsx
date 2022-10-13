import React, {useContext, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Dropdown, Form} from "react-bootstrap";
import {Context} from "../../index";
import {ICategory} from "../../types/goodsTypes";
import {observer} from "mobx-react-lite";
import {GoodsService} from "../../api/API";
import "./Goods.css";

interface IAddCategory {
    isNew: boolean,
    show: boolean,
    setShow: (bool: boolean) => void,
    category: ICategory,
}

const AddCategory = ({isNew, show, setShow, category}: IAddCategory) => {

    const handleClose = () => setShow(false);
    const [name, setName] = useState<string>("");

    useEffect(() => {
        setName("");
    }, [show])

    useEffect(() => {
        if (category) {
            setName(category.name);
        }
    }, [category])

    const handleSave = async () => {
        if (isNew) {
            try {
                await GoodsService.createCategory(name);
            } catch (e) {
                console.log(e)
            }
        } else {
            try {
                await GoodsService.changeCategory(category._id, name);
            } catch (e) {
                console.log(e)
            }
        }
        handleClose();
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isNew ? "Добавить категорию" : "Изменить категорию"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  placeholder={"Введите название товара"}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default observer(AddCategory);