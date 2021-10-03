import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const {cart} = props;

    //let productList = [];
    let total = 0;
    let tax = 0;
    let grandTotal = 0;
    let itemQuantity = 0;

    /*--------------using reduce-------------
    const totalReducer = (previous, product) => previous + product.price;
    const total = cart.reduce(totalReducer, 0);
    --------------*/

    for(const product of cart)
    {
        /*if(productList.indexOf(product.name) === -1)
        {
            productList.push(product.name.slice(0,30));
        }*/
        
        product.quantity = !product.quantity ? 1 : product.quantity;
        total = total + product.price * product.quantity;
        itemQuantity = itemQuantity + product.quantity;
    }
    const shipping = total > 0 ? 15 : 0;
    tax = (total + shipping) * 0.15;
    grandTotal = total + shipping + tax;
    return (
        <div className="cart">
            <h3>Order Summary</h3>
            <h5>Items ordered: {itemQuantity}</h5>
            <p>Total: ${total.toFixed(2)}</p>
            <p>Shipping: ${shipping}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h5>Grand Total: ${grandTotal.toFixed(2)}</h5>
            {/* displaying review order button, received from shop & orderReview */}
            {props.children} 
        </div>
    );
};

export default Cart;