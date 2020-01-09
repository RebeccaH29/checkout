import React from 'react';
import { FaCartPlus } from 'react-icons/fa';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../context/context';

export default function Navbar() {
    return (
        <ProductConsumer>
            {value => {
                const{links, cartItems, handleLinks} = value;
                return <NavWrapper>
                <nav className="navbar navbar-toggleable">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                        {links.map(link => {
                            return (
                                <li><Link to={link.path}
                                className="navbar-link"
                                onClick={handleLinks}
                                >{link.text.toUpperCase()}</Link></li>
                            )
                        })}
                        <FaCartPlus className='nav-icon'></FaCartPlus>
                        </ul>
                        <div className="cart-items">{cartItems}</div>
                    </div>
                </nav>
                </NavWrapper>;
            }}
        </ProductConsumer>
    )
}

const NavWrapper = styled.nav`
  background-color: #eff9b1;
  padding: 1rem;
  .navbar-nav {
    align-items: center;
    font-size: 1.5rem;
  }
  .cart-items {
      color: #0e3753;
  }
  .navbar-link {
      padding-left: 1.5rem;
      padding-right: 1rem;
  }
  .nav-icon: color: #0e3753;
  
`
