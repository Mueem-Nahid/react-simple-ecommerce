import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import {addToDb, getStoredCart} from '../../utilities/fakedb'
import './Shop.css';
import cartLogo from '../../images/shopping-cart.png';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useCart();
    const [displayProducts, setDisplayProducts] = useState([]) //state to display searched products

    //---------useSate for pagination----------
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const size = 10;

    useEffect(() => {
        //console.log('product API called');
        fetch(`http://localhost:5000/products?page=${page}&&size=${size}`)
        .then(res => res.json())
        .then(data => {
            setProducts(data.products);
            setDisplayProducts(data.products);
            const count = data.count; //taking the count value for pagination from server
            const pageNumber = Math.ceil(count/size);
            setPageCount(pageNumber);
        })
    }, [page]);

    const handleAddToCart = product => {
        const exists = cart.find(pd => pd.key === product.key);
        let newCart =[];
        if(exists)
        {
            const rest = cart.filter(pd => pd.key !== product.key);
            exists.quantity = exists.quantity+1;
            newCart = [...rest, exists]; //newCart = [...rest, product];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product]; //copying all the items of existing cart into newCart
        }
        setCart(newCart);
        //save to local-storage
        addToDb(product.key);
    }

    //to retrieve data from local-storage and display at UI
    useEffect( () => {
        //console.log('local storage cart called');

        if(products.length) { //if there is any product then ...
            const savedCart = getStoredCart(); //savedCart is an object
            //console.log('Saved cart:', savedCart);
            const storeCart = []; //declaring an empty array
            for(const key in savedCart) { //to access the properties of an object we use for in
                const addedProduct = products.find( product => product.key
                    === key );
                    //console.log(key, addedProduct);  addedProduct is an obj
                    if(addedProduct) {
                        const quantity = savedCart[key]; //taking quantity of individual item
                        addedProduct.quantity = quantity; //re-assigning a property into addedProduct
                        //console.log(addedProduct);
                        storeCart.push(addedProduct);
                    }
                    
            }
            setCart(storeCart); //calling setCart func with storeCart
        }
    }, []); //this useEffect will denend on products unless products won't be found

    const handleSearch = event => {
        const searchText = event.target.value;
        const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
        setDisplayProducts(matchedProducts);
            console.log(matchedProducts.length)
    }

    return (
        <div>
            <div className="search-bar">
                <input type="text" onChange={handleSearch} id="search" name="search" placeholder="Type here to search"/>
                <a href="/cart"><img src={cartLogo} alt="" /><span className="cart-count">0</span></a>
            </div>
            <div className="shop-container">
                <div className="product-container">
                    <h3>Products: {products.length}</h3>
                    {
                        displayProducts.map(product => <Product 
                            key = {product.key}
                            product={product}
                            handleAddToCart = {handleAddToCart}></Product>)
                    }
                    <div className="pagination">
                        {
                            [...Array(pageCount).keys()].map( number => <button key={number} className={number===page ? 'selected' : ''} onClick={()=>(setPage(number))}> {number+1} </button> )
                        }
                    </div>
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                        {/* setting a button and sending it to cart */}
                        <Link to="/order-review">
                        <button className="add-to-cart-btn">Review order</button></Link>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;