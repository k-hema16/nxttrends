import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items

  addCartItem = product => {
    const {cartList} = this.state
    const existingItem = cartList.find(item => item.id === product.id)
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: parseInt(existingItem.quantity) + parseInt(product.quantity),
      }
      const updatedCartList = cartList.map(item =>
        item.id === product.id ? updatedItem : item,
      )
      this.setState({cartList: updatedCartList})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(item => item.id !== id)
    this.setState({cartList: updatedCartList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const product = cartList.find(item => item.id === id)
    const updatedProduct = {
      ...product,
      quantity: parseInt(product.quantity) + 1,
    }
    const updatedCartList = cartList.map(item =>
      item.id === id ? updatedProduct : item,
    )
    this.setState({cartList: updatedCartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const product = cartList.find(item => item.id === id)
    if (product.quantity > 1) {
      const updatedProduct = {
        ...product,
        quantity: parseInt(product.quantity) - 1,
      }
      const updatedCartList = cartList.map(item =>
        item.id === id ? updatedProduct : item,
      )
      this.setState({cartList: updatedCartList})
    } else {
      const updatedCartList = cartList.filter(item => item.id !== id)
      this.setState({cartList: updatedCartList})
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
