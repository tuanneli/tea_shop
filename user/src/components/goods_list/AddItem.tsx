import React, {useContext, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Dropdown, Form} from "react-bootstrap";
import {Context} from "../../index";
import {ICategory, IItem} from "../../types/itemsTypes";
import {observer} from "mobx-react-lite";
import {GoodsService} from "../../api/API";
import "./Goods.css";

interface IAddItem {
    newItem: boolean
    show: boolean,
    setShow: (bool: boolean) => void,
    item: IItem
}

const AddItem = ({newItem, show, setShow, item}: IAddItem) => {

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [inAction, setInAction] = useState<boolean>(false);
    const [inStock, setInStock] = useState<boolean>(false);
    const {goodsStore} = useContext(Context);

    useEffect(() => {
        if (!show) {
            handleClose();
            setName("");
            setPrice("");
            setCategory("");
            setInAction(false);
            setInStock(false);
        }
    }, [show])

    useEffect(() => {
        if (item) {
            setInAction(item.inAction as boolean);
            setInStock(item.inStock as boolean);
            setName(item.name);
            setPrice(item.price);
            setCategory(item.category.name);
        }
    }, [item])

    const handleSave = async () => {
        if (newItem) {
            try {
                await GoodsService.createItem({name, price, inStock, inAction, category});
            } catch (e) {
                console.log(e)
            }
        } else {
            try {
                await GoodsService.changeItem({_id: item?._id, name, price, inStock, inAction, category});
            } catch (e) {
                console.log(e)
            }
        }
        setShow(false);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{newItem ? "Добавить товар" : "Изменить товар"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Dropdown>
                        <Dropdown.Toggle>{category == "" ? "Выберете категорию" : category}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {goodsStore.categories.map(category =>
                                <Dropdown.Item
                                    onClick={() => setCategory(category.name)}
                                    key={category.name}>{category.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                        <Form.Control value={name}
                                      onChange={(e) => setName(e.target.value)}
                                      placeholder={"Введите название товара"}/>
                        <Form.Control value={price}
                                      onChange={(e) => setPrice(e.target.value)}
                                      type={"number"}
                                      placeholder={"Введите цену в тенге"}/>
                        <Form.Check type="checkbox"
                                    checked={inStock}
                                    readOnly={true}
                                    onClick={() => setInStock(!inStock)}
                                    label="Есть в наличии"/>
                        <Form.Check type="checkbox"
                                    checked={inAction}
                                    readOnly={true}
                                    onClick={() => setInAction(!inAction)}
                                    label="Учавствует в акции"/>
                    </Dropdown>
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

export default observer(AddItem);