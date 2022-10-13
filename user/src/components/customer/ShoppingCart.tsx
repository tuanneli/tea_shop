import React, {useContext} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const ShoppingCart = () => {

    const {shoppingCartStore} = useContext(Context);

    return (
        <div>
            {shoppingCartStore.shoppingCart.map((item) =>
                <div key={item.name} className="d-flex">
                    <div className='ps-1'>{item?.name}</div>
                    <div className='ps-1'>{item?.price}</div>
                    <div className='ps-1'>{item?.amount}</div>
                </div>
            )}
        </div>
    );
};

export default observer(ShoppingCart);