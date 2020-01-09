import React from 'react';
import styled from 'styled-components';
import { ProductConsumer } from '../context/context';
import { Link } from 'react-router-dom';

export default function Product({product}) {
 
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
