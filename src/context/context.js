import React, { Component } from 'react';
import { linkData } from './linkData';
import { items } from './productData';

const ProductContext = React.createContext(); 

class ProductProvider extends Component {
    state= {
        cartOpen:true,
        cartItems: 0,
        links: linkData,
        cart: [],
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
        storeProducts: [],
        featuredProducts: [],
        filteredProducts: []
    };

    componentDidMount() {
        this.setProducts(items);
    }

    setProducts = products => {
        let storeProducts = items.map(item => {
            const name = item.name;
            const price = item.price;
            const tax = item.tax;
            const count = item.count;
            const id = item.id;
            const total = item.total;
            const featured = item.featured;
            const product = {name, price, tax, count, id, featured, total};
            return product;
        });
        console.log(storeProducts);
        // featured products
        let featuredProducts = storeProducts.filter(item =>
            item.featured === true);
        this.setState({
            storeProducts,
            filteredProducts:storeProducts,
            featuredProducts,
            cart:this.getStorageCart()
        },
        () => {
            this.addTotals();
        }
      );
    };

    getStorageCart = () => {
        return [];
    };
    getStorageProduct = () => {
        return [];
    };
    getTotals = () => {
        let subTotal = 0;
        let cartItems = 0;
        let total = 0;
        let taxTotal = 0;
        this.state.cart.forEach(item => {
            subTotal += item.total; 
            cartItems += item.count;
            //taxTotal = subTotal * item.tax;
            taxTotal += item.endTotal;
            total = subTotal + taxTotal;
        })
        subTotal = parseFloat(subTotal.toFixed(2));
        total  = parseFloat(total.toFixed(2));
        taxTotal = parseFloat(taxTotal.toFixed(2));
        return {
            cartItems,
            subTotal,
            total,
            taxTotal
        }
    };
    addTotals = () => {
        const totals = this.getTotals();
        this.setState({
            cartItems: totals.cartItems,
            cartSubTotal: totals.subTotal,
            cartTotal: totals.total,
            cartTaxTotal: totals.taxTotal,
            //cartTaxTotal: totals.endTotal,
            //cartTotal: totals.finalTotal

        });
    };
    syncStorage = () => {};
    addToCart = id => {
        let tempCart = [...this.state.cart];
        let tempProducts = [...this.state.storeProducts];
        let tempItem = tempCart.find(item => item.id === id);
        if(!tempItem){
            tempItem = tempProducts.find(item => item.id === id);
            console.log('tempProducts', tempProducts)
            let total = tempItem.price;
            let endTotal = tempItem.price * tempItem.tax;
            //total = parseFloat(tempItem.total.toFixed(2));
            //tempItem.endTotal = parseFloat(tempItem.endTotal.toFixed(2));
            let finalTotal = total + endTotal;
            let cartItem = {...tempItem, count:1, total, endTotal, finalTotal}
            tempCart = [...tempCart, cartItem]
        }
        else {
            tempItem.count++;
            tempItem.total = tempItem.price * tempItem.count;
            tempItem.total = parseFloat(tempItem.total.toFixed(2));
            tempItem.endTotal = tempItem.total * tempItem.tax;
            tempItem.endTotal = parseFloat(tempItem.endTotal.toFixed(2));
            tempItem.finalTotal = tempItem.total + tempItem.endTotal;
            tempItem.finalTotal = parseFloat(tempItem.finalTotal.toFixed(2));
        }
        this.setState(() => {
            return {cart:tempCart}
        },() => {
            this.addTotals();
            this.syncStorage();
            this.openCart();

        })
    }

    removeFromCart = id => {
        let tempCart = [...this.state.cart];
        let tempProducts = [...this.state.storeProducts];
        let tempItem = tempCart.find(item => item.id === id);
        if(!tempItem){
            tempItem = tempProducts.find(item => item.id === id);
            console.log('tempProducts', tempProducts)
            let total = tempItem.price;
            let endTotal = tempItem.price * tempItem.tax;
            //total = parseFloat(tempItem.total.toFixed(2));
            //tempItem.endTotal = parseFloat(tempItem.endTotal.toFixed(2));
            let finalTotal = total + endTotal;
            finalTotal = parseFloat(finalTotal.toFixed(2));
            let cartItem = {...tempItem, count:1, total, endTotal, finalTotal}
            tempCart = [...tempCart, cartItem]
        }
        else {
            tempItem.count--;
            tempItem.total = tempItem.price * tempItem.count;
            tempItem.total = parseFloat(tempItem.total.toFixed(2));
            tempItem.endTotal = tempItem.total * tempItem.tax;
            tempItem.endTotal = parseFloat(tempItem.endTotal.toFixed(2));
            tempItem.finalTotal = tempItem.total + tempItem.endTotal;
            tempItem.finalTotal = parseFloat(tempItem.finalTotal.toFixed(2));
        }
        this.setState(() => {
            return {cart:tempCart}
        },() => {
            this.addTotals();
            this.syncStorage();
            this.openCart();

        })
    }

    // handle cart
    handleCart = () => {
        this.setState({cartOpen:!this.state.sidebarOpen})
    }
    handleLinks = () => {
        this.setState({cartOpen:!this.state.sidebarOpen})
    }
    // close cart
    closeCart = () => {
        this.setState({ cartOpen: false})
    }
    // open cart
    openCart = () => {
        this.setState({ cartOpen: true})
    }

    // increment item in cart
    increment = id => {
        let tempCart = [...this.state.cart];
        const cartItem = tempCart.find(item => item.id === id);
        console.log(cartItem);
        cartItem.count++;
        cartItem.total = cartItem.count * cartItem.price;
        cartItem.total = parseFloat(cartItem.total.toFixed(2));
        this.setState(() => {
            return {
                cart:[...tempCart]
            }
        },() => {
            this.addTotals();
            this.syncStorage();
        })
    };
   // decrement = id => {
     //   console.log(id);
    //};
    removeItem = id => {
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.id !== id);
        this.setState({
            cart:[...tempCart]
        },
        () => {
            this.addTotals();
            this.syncStorage();
        });
    };
    render() {
        return (
        <ProductContext.Provider 
            value={{
                ...this.state,
                handleCart: this.handleCart,
                closeCart: this.closeCart,
                openCart: this.openCart,
                addToCart: this.addToCart,
                storeProducts: this.storeProducts,
                increment: this.increment,
                removeFromCart: this.removeFromCart,
                removeItem: this.removeItem

        }}>
        {this.props.children}
        </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
