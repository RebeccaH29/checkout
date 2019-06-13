import React from 'react';
import styled from 'styled-components';
import { ProductConsumer } from '../context/context';
import { FaCartPlus } from 'react-icons/fa';
import Product from '../components/Product';
import { Link } from 'react-router-dom';

export default function ProductsPage() {
    return (
        <section>
            <div className="container"></div>
            <div className="row">
            {/*<ProductConsumer>
                {value => {
                    const {featuredProducts} = value;

                    return featuredProducts.map(product =>(<Product key={product.id}>
                    product={product}</Product>))
                }}
            </ProductConsumer> */}
            <Product></Product>
            </div>
        </section>
    )
}