function CartItem({
  line,
  onChangeQty,
  onRemove,
  onChangeNote,
}) {
  const { item, qty, note } = line

  return (
    <li className="cart-line">
      <div>
        <p className="cart-name">{item.name}</p>
        <p className="muted">
          RM {item.price.toFixed(2)} each
        </p>

        <label htmlFor={`note-${item.id}`}>
          Order note
        </label>

        <textarea
          id={`note-${item.id}`}
          value={note}
          onChange={(event) =>
            onChangeNote(item.id, event.target.value)
          }
          placeholder="E.g. less spicy, no onions"
          rows="2"
        />
      </div>

      <div className="qty">
        <button
          type="button"
          aria-label={`Decrease ${item.name} quantity`}
          onClick={() => onChangeQty(item.id, -1)}
        >
          −
        </button>

        <span>{qty}</span>

        <button
          type="button"
          aria-label={`Increase ${item.name} quantity`}
          onClick={() => onChangeQty(item.id, 1)}
        >
          +
        </button>
      </div>

      <p className="line-total">
        RM {(item.price * qty).toFixed(2)}
      </p>

      <button
        type="button"
        className="link danger"
        onClick={() => onRemove(item.id)}
      >
        Remove
      </button>
    </li>
  )
}

export default CartItem