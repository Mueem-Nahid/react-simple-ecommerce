import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import Rating from 'react-rating';

const Product = (props) => {
    const {name, img, price, category, seller, stock, star} = props.product;
    const element = <FontAwesomeIcon icon={faShoppingCart} />

    return (
        <div className="">
            <div className="product">
                <div>
                    <img src={img} alt="" />
                </div>
                <div className="info">
                    <h4>{name}</h4>
                    <p>by: {seller}</p>
                    <p>Category: {category}</p>
                    <p>Price: ${price}</p>
                    <p>Only {stock} left in stock - order soon</p>
                    <Rating initialRating={star} readonly emptySymbol="far fa-star icon" fullSymbol="fas fa-star icon"></Rating>
                    <br />
                    <button onClick={() => props.handleAddToCart(props.product)} className="add-to-cart-btn">{element} Add to cart</button>
                </div>
            </div>
            <hr />
        </div>
    );
};

export default Product;