import React from 'react';
import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa'
import { ProductConsumer } from '../context/context';
import { Link } from 'react-router-dom';

export default function CartPage() {
    return <ProductConsumer>
        {value => {
            //const {cartOpen, cart, cartSubTotal, addToCart, removeItem, increment, id, removeFromCart} = value;
            const {cartOpen, cart, cartSubTotal, cartTotal, addToCart, removeItem, removeFromCart, cartTaxTotal} = value;
            return <CartWrapper show={cartOpen}>
            <div className="row mt-5 text-center">
                <div className="productList">
                    {cart.map(item =>
                        <div key={item.id}>
                        <div className="col-10 mx-auto col-lg-2 pb-2">{item.name} </div>
                        <div className="col-10 mx-auto col-lg-1 pb-2">£{item.price} </div>
                        <button onClick={() => addToCart(item.id)}>+</button>
                        <button onClick={() => removeFromCart(item.id)}>-</button>
                        <div className="col-10 mx-auto col-lg-1 pb-2">Remove <FaTrash className="trash-icon pb-2" onClick={() => removeItem(item.id)}></FaTrash></div>
                        <div className="col-10 mx-auto col-lg-1 pb-1 itemTimes">Item x {item.count} </div>
                        <div className="col-10 mx-auto col-lg-1 pb-1">Tax at: {item.tax * 100}% </div>
                        <div className="col-10 mx-auto col-lg-2 pb-2">Sales tax: £{parseFloat(item.endTotal.toFixed(2))} </div>
                        <div className="col-10 mx-auto col-lg-2 pb-2">Item total: £{parseFloat(item.finalTotal.toFixed(2))} </div>
                        <hr></hr>
                        </div>)}
                </div>
            </div>
            <div>Sales tax total: £{cartTaxTotal}</div>
            <div>Shoppingcart total: £{cartTotal}</div>
            <hr></hr>
            <Link to={`/`}>Return to Product Page</Link>
            </CartWrapper> 
        
        }}
    </ProductConsumer>
        
    
}
const CartWrapper = styled.div`
padding-left: 3rem;
svg.trash-icon {
    text-size: 1.5rem;
    width: 1rem;
    height: 1.5rem;
    padding-top: 5px;
    padding-bottom: 0px !important;
} 
div.productList, div {
    width: 100%;
    display: inline-block;
}
`;