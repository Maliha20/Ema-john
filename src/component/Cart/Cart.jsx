import React from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReceipt } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const Cart = ({cart, handleClearCart, children}) => {
    
    let total = 0;
    let quantity = 0;
    let totalShipping = 0;
    for(const product of cart){
        if(product.quantity === 0){
            product.quantity = 1;
        }
        total = total + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping;
        quantity =product.quantity;
    }
    const tax = total*7/100;
    const grandTotal = total + totalShipping + tax;
    return (
        <div className='cart'>
            <h4>order summary</h4>
            <p>Selected Items: {cart.length}</p>
            <p>Total price: ${total.toFixed(2)} </p>
            <p>Total Shipping Charge: ${totalShipping.toFixed(2)}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h5>Grand Total: {grandTotal.toFixed(2)}</h5>
            <button onClick={handleClearCart} className='btn-clear'>
                <span>clear cart</span>
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
             {/* <button className='btn-proceed'>
                <span>Proceed</span>
               
            </button> */}
           {children}
        </div>
    );
};

export default Cart;