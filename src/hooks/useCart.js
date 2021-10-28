import { useEffect, useState } from "react"
import { getStoredCart } from "../utilities/fakedb";

const useCart = () => { //declaring useCart with a param 'product' as Cart depends on products
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getStoredCart(); //getting saved products from local storage
        const keys = Object.keys(savedCart);
        fetch('http://localhost:5000/products/byKeys', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(keys)
        })
        .then(res=>res.json())
        .then(products => {

            if(products.length){
            const stordCart = [];
            for(const key in savedCart) //in savedCart there will be key, value of products, for in for object
            {
                const addedProduct = products.find(product => product.key === key);
                if(addedProduct)
                {
                    //set quantity
                    const quantity = savedCart[key]; //taking the quantity of each products
                    addedProduct.quantity = quantity;
                    stordCart.push(addedProduct);
                }
            }
            setCart(stordCart);
            }
        })
        
    }, []) //declaring useEffect with a dependency products
    return [cart, setCart]; //returning cart and setCart
}

export default useCart;