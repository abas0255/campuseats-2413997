import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'
import CartPage from './components/CartPage.jsx'

function App() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [cart, setCart] = useState([])
  const [view, setView] = useState('menu')
  const [lastOrder, setLastOrder] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    setLoading(true)
    setError(null)

    fetch('/api/vendors.json', {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        setVendors(data)

        if (data.length > 0) {
          setSelectedVendorId(
            (currentId) => currentId ?? data[0].id
          )
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [reloadKey])

  const selectedVendor = vendors.find(
    (vendor) => vendor.id === selectedVendorId
  )

  function handleAddToCart(item) {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (line) => line.item.id === item.id
      )

      if (existing) {
        return prevCart.map((line) =>
          line.item.id === item.id
            ? { ...line, qty: line.qty + 1 }
            : line
        )
      }

      return [
        ...prevCart,
        {
          item,
          qty: 1,
          note: '',
        },
      ]
    })
  }

  function handleChangeQty(itemId, delta) {
    setCart((prevCart) =>
      prevCart
        .map((line) =>
          line.item.id === itemId
            ? { ...line, qty: line.qty + delta }
            : line
        )
        .filter((line) => line.qty > 0)
    )
  }

  function handleRemove(itemId) {
    setCart((prevCart) =>
      prevCart.filter((line) => line.item.id !== itemId)
    )
  }

  function handleChangeNote(itemId, note) {
    setCart((prevCart) =>
      prevCart.map((line) =>
        line.item.id === itemId
          ? { ...line, note }
          : line
      )
    )
  }

  function handlePlaceOrder(details) {
    const total = cart.reduce(
      (sum, line) => sum + line.item.price * line.qty,
      0
    )

    setLastOrder({
      ...details,
      total,
      items: cart,
    })

    setCart([])
    setView('done')
  }

  const cartCount = cart.reduce(
    (total, line) => total + line.qty,
    0
  )

  let content

  if (view === 'cart') {
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onChangeNote={handleChangeNote}
        onPlaceOrder={handlePlaceOrder}
      />
    )
  } else if (view === 'done') {
    content = (
      <section className="card">
        <h2>Order placed successfully!</h2>
        {lastOrder && (
          <>
            <p>Thank you, {lastOrder.name}.</p>
            <p>Mahallah: {lastOrder.mahallah}</p>
            <p>Pickup time: {lastOrder.pickupTime}</p>
            <p className="cart-total">
              Total: RM {lastOrder.total.toFixed(2)}
            </p>
          </>
        )}
        <button
          type="button"
          className="btn"
          onClick={() => setView('menu')}
        >
          Back to vendors
        </button>
      </section>
    )
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = (
      <ErrorMessage
        message={error}
        onRetry={() => setReloadKey((key) => key + 1)}
      />
    )
  } else if (vendors.length === 0) {
    content = <p>No vendors available.</p>
  } else {
    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>

          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>

        {selectedVendor && (
          <section>
            <h2 className="section-title">
              Menu: {selectedVendor.name}
            </h2>

            <MenuList
              items={selectedVendor.menu}
              onAdd={handleAddToCart}
            />
          </section>
        )}
      </>
    )
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView('menu')}
        onShowCart={() => setView('cart')}
      />

      <main className="container">
        {content}
      </main>

      <Footer />
    </>
  )
}

export default App