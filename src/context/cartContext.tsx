import { createContext, useCallback, useContext, useState } from 'react'

interface ICartContextData {
  products: Array<ICartProduct>
  addProduct: (product: IProduct) => void
  removeProduct: (product: IProduct) => void
  increaseQuantity: (product: IProduct) => void
  decreaseQuantity: (product: IProduct) => void
}

interface ICartProduct {
  product: IProduct
  quantity: number
}

const CartContext = createContext<ICartContextData>({} as ICartContextData)

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<ICartProduct[]>([])

  const addProduct = useCallback((product: IProduct) => {
    setProducts(previousState => [...previousState, { product, quantity: 1 }])
  }, [])

  const removeProduct = useCallback(() => {}, [])

  const increaseQuantity = useCallback(() => {}, [])

  const decreaseQuantity = useCallback(() => {}, [])

  return (
    <CartContext.Provider
      value={{
        products,
        addProduct,
        removeProduct,
        increaseQuantity,
        decreaseQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => useContext(CartContext)

export { CartContext, CartProvider, useCart }
