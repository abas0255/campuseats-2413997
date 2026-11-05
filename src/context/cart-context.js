import { createContext } from 'react'
// The "channel". CartProvider puts the cart into it; useCart() reads it out.
export const CartContext = createContext(null)