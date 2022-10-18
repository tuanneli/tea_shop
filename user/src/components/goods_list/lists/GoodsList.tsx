import React, {memo, useContext, useEffect, useState} from 'react';
import {GoodsService, UsersService} from "../../../api/API";
import {IItem} from "../../../types/goodsTypes";
import AddItem from "../addMenu/AddItem";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import "../Goods.css";
import "./Lists.css";
import ConformationModal from "../../../common/ConformationModal";

const GoodsList = () => {
    const [item, setItem] = useState<IItem>();
    const [error, setError] = useState<string>("");
    const [newItem, setNewItem] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const {goodsStore} = useContext(Context);
    const [showConformationModal, setShowConformationModal] = useState<boolean>(false);
    const [confirmed, setConfirmed] = useState<boolean>(false);
    const [itemForDelete, setItemForDelete] = useState<string>("");

    const getAllItems = () => {
        try {
            goodsStore.getGoods();
            goodsStore.getCategories();
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (confirmed) {
            GoodsService.deleteItem(itemForDelete).then(() => {
                getAllItems();
            });
        } else {
            getAllItems();
        }
        setConfirmed(false);
    }, [isActive, showConformationModal]);

    const handleDelete = (name: string) => {
        setItemForDelete(name);
        setShowConformationModal(true);
    };

    const handleChange = (item: IItem) => {
        setNewItem(false);
        setIsActive(true);
        setItem(item);
    }

    const handleAddItem = () => {
        setNewItem(true);
        setIsActive(true);
    }

    return (
        <div className='goods-container'>
            <div className="w-100">
                <div className="goods-row text-white row">
                    <div className={'categories-label col-md-12'}>ТОВАРЫ</div>
                </div>
                <div className="goods-row text-white row">
                    <div className="goods-item justify-content-center col-md-5">Название</div>
                    <div className="goods-item justify-content-center col-md-2">Категория</div>
                    <div className="goods-item justify-content-center col-md-1">Цена</div>
                    <div className="goods-item justify-content-center col-md-1">Есть</div>
                    <div className="goods-item justify-content-center col-md-1">В акции</div>
                    <button className='add-new-button justify-content-center col-md-2'
                            onClick={handleAddItem}>Добавить
                        товар
                    </button>
                </div>
                {goodsStore.goods.length !== 0 && goodsStore.goods.map(item => {
                    if (item?.category?.name == goodsStore.categorySorted || goodsStore.categorySorted == "all") {
                        return <div key={item.name} className="goods-row text-white row">
                            <div className="goods-item col-md-5 col-sm-3">{item?.name}</div>
                            <div className="goods-item col-md-2 col-sm-1">{item?.category?.name}</div>
                            <div className="goods-item col-md-1 col-sm-1">{item?.price}</div>
                            <div className="goods-item col-md-1 col-sm-1">{item?.inStock ? "Да" : "Нет"}</div>
                            <div className="goods-item col-md-1 col-sm-1">{item?.inAction ? "Да" : "Нет"}</div>
                            <button className="remove-button col-md-1 col-sm-2"
                                    onClick={() => handleDelete(item.name)}>Удалить
                            </button>
                            <button className="change-button col-md-1 col-sm-2"
                                    onClick={() => handleChange(item)}>Изменить
                            </button>
                        </div>
                    }
                })}
            </div>
            <AddItem newItem={newItem} show={isActive} setShow={setIsActive} item={item as IItem}/>
            <ConformationModal show={showConformationModal}
                               setShow={setShowConformationModal}
                               setConfirmed={setConfirmed}
                               confirmed={confirmed}/>
        </div>
    );
};

export default observer(GoodsList);