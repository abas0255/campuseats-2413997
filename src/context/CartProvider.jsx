import { useEffect, useState } from 'react'
import { CartContext } from './cart-context.js'
import { useAuth } from '../hooks/useAuth.js'

export function CartProvider({ children }) {
  const { user, loading } = useAuth()
  const userId = user?.uid || 'guest'

  const [cart, setCart] = useState([])
  const [notes, setNotes] = useState({})
  const [loadedUserId, setLoadedUserId] = useState(null)

  useEffect(() => {
    if (loading) return

    try {
      const savedCart = localStorage.getItem(`campuseats-cart-${userId}`)
      const savedNotes = localStorage.getItem(`ce-notes-${userId}`)

      setCart(savedCart ? JSON.parse(savedCart) : [])
      setNotes(savedNotes ? JSON.parse(savedNotes) : {})
    } catch {
      setCart([])
      setNotes({})
    }

    setLoadedUserId(userId)
  }, [userId, loading])

  useEffect(() => {
    if (loadedUserId !== userId) return

    localStorage.setItem(`campuseats-cart-${userId}`, JSON.stringify(cart))
  }, [cart, userId, loadedUserId])

  useEffect(() => {
    if (loadedUserId !== userId) return

    localStorage.setItem(`ce-notes-${userId}`, JSON.stringify(notes))
  }, [notes, userId, loadedUserId])

  function addToCart(item) {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id)

      if (existing) {
        return prev.map((line) =>
          line.item.id === item.id
            ? { ...line, qty: line.qty + 1 }
            : line
        )
      }

      return [...prev, { item, qty: 1 }]
    })
  }

  function changeQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((line) =>
          line.item.id === itemId
            ? { ...line, qty: line.qty + delta }
            : line
        )
        .filter((line) => line.qty > 0)
    )
  }

  function changeNote(itemId, note) {
    setNotes((prev) => ({ ...prev, [itemId]: note }))
  }

  function removeFromCart(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId))
    setNotes((prev) => {
      const updated = { ...prev }
      delete updated[itemId]
      return updated
    })
  }

  function clearCart() {
    setCart([])
    setNotes({})
  }

  const count = cart.reduce((sum, line) => sum + line.qty, 0)
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)

  const value = { cart, notes, count, total, addToCart, changeQty, changeNote, removeFromCart, clearCart }

  if (loading || loadedUserId !== userId) return null

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}