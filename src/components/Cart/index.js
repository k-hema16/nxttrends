import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0

      const removeAll = () => {
        removeAllCartItems()
      }
      const totalPrice = cartList.reduce(
        (total, item) =>
          total + parseInt(item.price, 10) * parseInt(item.quantity),
        0,
      )

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  type="button"
                  className="cart-total-price btn"
                  onClick={removeAll}
                >
                  Remove All
                </button>
                <CartListView />
                <div className="cart-summary">
                  <h1>{`Order Total: Rs ${totalPrice}/-`}</h1>
                  <p>{`${cartList.length} Items in cart`}</p>
                  <button className="logout-desktop-btn" type="button">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
