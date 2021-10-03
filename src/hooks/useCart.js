import { useEffect, useState } from "react"
import { getStoredCart } from "../utilities/fakedb";

const useCart = products => { //declaring useCart with a param 'product' as Cart depends on products
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if(products.length){
            const savedCart = getStoredCart(); //getting saved products from local storage
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
    }, [products]) //declaring useEffect with a dependency products
    return [cart, setCart]; //returning cart and setCart
}

export default useCart;