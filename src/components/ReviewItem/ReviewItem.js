import React from 'react';

const ReviewItem = (props) => {
    const {img, name, price, quantity, key} = props.product;
    const {handleRemove} = props; //destucturing and taking handleRemove from props
    return (
        <div>
            <div className="product">
                <div>
                    <img src={img} alt="" />
                </div>
                <div className="info">
                    <h4 className="">{name}</h4>
                    <p>Price: {price}</p>
                    <p>Quantity: {quantity}</p>
                    {/* taking the key and sending key to handleRemove() */}
                    <button onClick={() => handleRemove(key)} className="add-to-cart-btn">Rmove</button>
                </div>
            </div>
            <hr />
        </div>
    );
};

export default ReviewItem;