import React from "react";
import {FaPlus, FaMinus} from "react-icons/fa";

interface Props{
    id: number;
    key: number;
    index: number;
    item: any;
    removeItem: (index: number) => void;
    itemQuantityHandler: (index: number, method: string) => void;
}

const CartItem = ({index, id, item, removeItem, itemQuantityHandler} : Props) => {
    const {cover, title} = item.purchase.movie;

    return(<>
        <div className="cart-item-wrapper">
            {cover === undefined || cover === "" ? <>
                <img src={require("../images/no-image-found.jpg")} alt="Movie Cover" className="cart-item-img"/></> : <>
                <img src={cover} alt="Movie Cover" className="cart-item-img"/></>}
            <div className="cart-item-content">
                <div>
                    <h1 className="cart-item-title">{title}</h1>
                    <span className="cart-item-cost">${item.purchase.cost * item.purchase.quantity}</span>
                </div>
                <div>
                    <div className="cart-item-btn-wrapper">
                        <button onClick={() => itemQuantityHandler(index, "subtract")} title="minus"><FaMinus/></button>
                        <span>{item.purchase.quantity}</span>
                        <button onClick={() => itemQuantityHandler(index, "add")} title="add"><FaPlus/></button>
                    </div>
                    <button className="cart-item-delete-btn" title="close" onClick={() => removeItem(index)}>Delete</button>
                </div>
            </div>
        </div>
    </>);
}

export default CartItem;