import React from 'react';
import { useHistory } from 'react-router';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import { clearTheCart, deleteFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const OrderReview = () => {
    const [products] = useProducts(); //calling useProducts() and destructuring
    const [cart, setCart] = useCart(products); //calling useCart() hook and taking cart and setCart
    const history = useHistory();

    const handleRemove = key => { //function to remove added item
        const newCart = cart.filter(product => product.key !== key); //taking all the products without selected key
        setCart(newCart); //setting setCart with newCart
        deleteFromDb(key);
    }

    const handleShipping = () => {
        /*pushing a new route 'place-order' into hisotry
        history.push('/place-order');
        clearTheCart(); calling clearTheCart func from fakedb.js */

        history.push('/shipping');
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(product => <ReviewItem 
                        key={product.key} 
                        product={product}
                        handleRemove={handleRemove}></ReviewItem>) //sending handleRemove to ReviewItem
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    {/* setting a button and sending it to cart */}
                    <button onClick={handleShipping} className="add-to-cart-btn">Proceed to shipping</button>
                </Cart>
            </div>
        </div>
    );
};

export default OrderReview;