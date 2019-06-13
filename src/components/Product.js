import React, { Component } from 'react';
import styled from 'styled-components';
import { ProductConsumer } from '../context/context';
import { FaCartPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom';


/*const products = ([
    { name: "Travel Book", price: 12.49, tax: 0, quantity: 0 },
    { name: "Music CD", price: 14.99, tax: 0.20, quantity: 0 },
    { name: "Chocolate bar", price: 0.85, tax: 0, quantity: 0 },
    { name: "Imported box of chocolates", price: 10, tax: 0.05, quantity: 2 },
    { name: "Imported bottle of perfume", price: 47.50, tax: 0.25, quantity: 0 },
    { name: "Bottle of perfume", price: 18.99, tax: 0.20, quantity: 0 },
    { name: "Packet of painkillers", price: 9.75, tax: 0, quantity: 0 }
  ]); */

export default function Product({product}) {
//class Product extends Component {
   
    //render() {
 
    return (<div>
        <ProductConsumer>
            {value => {
                const {featuredProducts, addToCart} = value;
                return <ProductWrapper>
                <div className="section py-5">
                <div className="row">
                    <div className="productList">
                        {featuredProducts.map(item =>
                            <div key={item.id}>
                            <div className="col-10 mx-auto col-lg-2 pb-2">{item.name} </div>
                            <div className="col-10 mx-auto col-lg-1 pb-2">£{item.price} </div>
                            <button onClick={() => addToCart(item.id)}>Add to basket</button>
                            </div>)}
                    </div>
                </div>
                <button className="col-lg-1"><Link className="col-10 mx-auto col-lg-1 pb-2" to={`/cart`}>Cart</Link></button>
                </div>
                </ProductWrapper> 
            }}
            </ProductConsumer> 
        </div>
    )
 }

const ProductWrapper = styled.div`
padding-left: 3rem;
div {
    display: inline-block;
    width: 100%;
}
button {
    padding-left: 10px;
}
`;
