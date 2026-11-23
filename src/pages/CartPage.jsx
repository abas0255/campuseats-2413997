import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useCart } from '../hooks/useCart.js'
import { useAuth } from '../hooks/useAuth.js'
import { placeOrders } from '../services/orders.js'
import CartItem from '../components/CartItem.jsx'
import CheckoutForm from '../components/CheckoutForm.jsx'

function CartPage() {
  const { cart, notes, total, changeQty, changeNote, removeFromCart, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  async function handlePlaceOrder(details) {
    setError('')

    try {
      const cartWithNotes = cart.map((line) => ({
        ...line,
        note: notes[line.item.id] || ''
      }))

      await placeOrders(user, cartWithNotes, details)
      clearCart()
      navigate('/orders')
    } catch (err) {
      setError(`Could not place the order: ${err.message}`)
    }
  }

  if (cart.length === 0) {
    return (
      <section>
        <h2 className="section-title">Your cart</h2>
        <p className="muted">Your cart is empty. Pick something from a menu.</p>
      </section>
    )
  }

  return (
    <section>
      <h2 className="section-title">Your cart</h2>
      <div className="cart-layout">
        <div className="card">
          <ul className="cart-list">
            {cart.map((line) => (
              <CartItem key={line.item.id} line={{ ...line, note: notes[line.item.id] || '' }} isLoggedIn={Boolean(user)} onChangeQty={changeQty} onRemove={removeFromCart} onChangeNote={changeNote} />
            ))}
          </ul>
          <p className="cart-total">Total: RM {total.toFixed(2)}</p>
        </div>
        <div>
          {error && <p className="field-error" role="alert">{error}</p>}
          <CheckoutForm defaultName={user?.displayName ?? ''} onPlaceOrder={handlePlaceOrder} />
        </div>
      </div>
    </section>
  )
}

export default CartPage