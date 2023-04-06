import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';

import Product from '../Product/Product';
import ReviewItem from '../reviewItem/reviewItem';
import './Order.css'
import { removeFromDb } from '../../utilities/fakedb';


const Order = () => {
    const savedCart = useLoaderData();
    const [cart,setCart] = useState(savedCart);
    const handleRemoveBtn = (id) =>{
        const remaining = cart.filter(product => product.id !== id)
        setCart(remaining);
        removeFromDb(id)
    }
    return (
        <div className='shop-container'>
            <div className='review-container'>
    
                {
                    cart.map(product=> 
                    <ReviewItem key = {product.id}
                     product = {product} 
                     handleRemoveBtn ={handleRemoveBtn}>

                     </ReviewItem>)
                }
            </div>
            <div className='cart-container'>
                <Cart cart= {cart}></Cart>
            </div>
        </div>
    );
};

export default Order;