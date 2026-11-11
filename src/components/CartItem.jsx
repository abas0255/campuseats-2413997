import { Link } from 'react-router'

function CartItem({ line, isLoggedIn, onChangeQty, onRemove, onChangeNote }) {
  const { item, qty, note } = line

  return (
    <li className="cart-line">
      <div>
        <p className="cart-name">{item.name}</p>
        <p className="muted">RM {item.price.toFixed(2)} each</p>

        {isLoggedIn ? (
          <label>
            Order note:
            <input type="text" value={note || ''} placeholder="e.g. Less spicy, no onions" onChange={(e) => onChangeNote(item.id, e.target.value)} />
          </label>
        ) : (
          <p className="muted"><Link to="/login">Log in to add notes</Link></p>
        )}
      </div>
      <div className="cart-controls">
        <button type="button" onClick={() => onChangeQty(item.id, -1)}>-</button>
        <span>{qty}</span>
        <button type="button" onClick={() => onChangeQty(item.id, 1)}>+</button>
        <span>RM {(item.price * qty).toFixed(2)}</span>
        <button type="button" className="btn btn-outline" onClick={() => onRemove(item.id)}>Remove</button>
      </div>
    </li>
  )
}

export default CartItem