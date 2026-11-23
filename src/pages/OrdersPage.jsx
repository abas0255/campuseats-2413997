import { Link } from 'react-router'
import { useMyOrders } from '../hooks/useMyOrders.js'
import OrderStatus from '../components/OrderStatus.jsx'
import OrderActions from '../components/OrderActions.jsx'

function OrdersPage() {
  const { orders, loading, error } = useMyOrders()

  if (loading) {
    return <p>Loading orders...</p>
  }

  if (error) {
    return <p className="field-error">Could not load orders: {error}</p>
  }

  if (orders.length === 0) {
    return (
      <section>
        <h2 className="section-title">My orders</h2>
        <p className="muted">
          No orders yet. <Link to="/">Browse vendors</Link>
        </p>
      </section>
    )
  }

  return (
    <section>
      <h2 className="section-title">My orders</h2>

      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id} className="card">
            <p className="cart-name">{order.vendorName} · Pickup {order.pickupTime}</p>

            <p className="muted">Mahallah {order.mahallah}</p>

            <div className="muted">
              {order.items.map((item) => (
                <p key={item.itemId}>
                  {item.qty}× {item.name}
                  {item.note && ` — Note: ${item.note}`}
                </p>
              ))}
            </div>

            <p className="price">RM {order.total.toFixed(2)}</p>

            <OrderStatus status={order.status} />

            {order.status === 'Received' && <OrderActions order={order} />}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default OrdersPage