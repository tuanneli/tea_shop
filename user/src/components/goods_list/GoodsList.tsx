import React, {useContext, useEffect, useState} from 'react';
import {GoodsService, UsersService} from "../../api/API";
import {IItem} from "../../types/itemsTypes";
import AddItem from "./AddItem";
import {Context} from "../../index";
import {flowResult} from "mobx";
import {observer} from "mobx-react-lite";
import "./Goods.css";

const GoodsList = () => {

    const [items, setItems] = useState<IItem[]>([]);
    const [item, setItem] = useState<IItem>();
    const [error, setError] = useState<string>("");
    const [newItem, setNewItem] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const {goodsStore} = useContext(Context);
    const {userStore} = useContext(Context);

    const getAllItems = () => {
        try {
            goodsStore.getGoods().then((result) => {
                setItems(result.data);
            });
            goodsStore.getCategories();
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getAllItems();
    }, [isActive])

    const handleDelete = (name: string) => {
        GoodsService.deleteItem(name).then(() => {
            getAllItems();
        });
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
        <div>
            <div className="d-flex justify-content-center">
                <div>
                    <div className="bg-dark text-white workers-box">
                        <div className="worker-row">
                            <div className="worker-item justify-content-center">Название</div>
                            <div className="worker-item justify-content-center">Цена</div>
                            <div className="worker-item justify-content-center">Тип</div>
                            <div className="worker-item justify-content-center">В наличии</div>
                            <div className="worker-item justify-content-center">В акции</div>
                            <div style={{border: "none", width: "75px", backgroundColor: "white"}}></div>
                        </div>
                    </div>
                    {items.length !== 0 && items.map(item => {
                        if (item.category == goodsStore.categorySorted || goodsStore.categorySorted == "all") {
                            return <div key={item.name} className="bg-dark text-white workers-box">
                                <div className="worker-row">
                                    <div className="worker-item">{item.name}</div>
                                    <div className="worker-item">{item.price}</div>
                                    <div className="worker-item">{item.category}</div>
                                    <div className="worker-item">{item.inStock ? "Да" : "Нет"}</div>
                                    <div className="worker-item">{item.inAction ? "Да" : "Нет"}</div>
                                    <button onClick={() => handleDelete(item.name)}>X
                                    </button>
                                    <button onClick={() => handleChange(item)}>Изменить
                                    </button>
                                </div>
                            </div>
                        }
                    })}
                    <div className='w-100 d-flex'>
                        <button onClick={handleAddItem}>Добавить товар</button>
                    </div>
                </div>
            </div>
            <AddItem newItem={newItem} show={isActive} setShow={setIsActive} item={item as IItem}/>
        </div>
    );
};

export default observer(GoodsList);