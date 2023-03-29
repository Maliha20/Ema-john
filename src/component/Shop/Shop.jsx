import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        //step-1 get id
        for (const id in storedCart) {
            // step-2 get the product by using id of the product
            const savedProduct = products.find(product => product.id === id);
            //get the quantity of the product
            if(savedProduct){
                const quantity = storedCart[id];
                savedProduct.quantity = quantity
                //add the new product into the cart
                savedCart.push(savedProduct);
            }
            console.log(savedProduct)
        }
        //set the new cart
        setCart(savedCart);
    }, [products]);

    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id);
    }
    return (
        <div className='shop-container'>
            <div className='products-container'>
                {products.map(product =>
                    <Product key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)}

            </div>
            <div className='cart-container'>
                <Cart cart={cart}></Cart>
            </div>

        </div>
    );
};

export default Shop;