import { createContext, useCallback, useContext, useState } from 'react'

interface ICartContextData {
  products: Array<ICartProduct>
  addProduct: (product: IProduct) => void
  removeProduct: (productId: string) => void
  increaseQuantity: (productId: string) => void
  decreaseQuantity: (productId: string) => void
}

const CartContext = createContext<ICartContextData>({} as ICartContextData)

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<ICartProduct[]>([])

  const addProduct = useCallback((product: IProduct) => {
    setProducts(previousState => {
      const productAlreadyExists =
        previousState.filter(
          previousProduct => previousProduct.product.id === product.id
        ).length !== 0

      if (productAlreadyExists) return [...previousState]

      return [...previousState, { product, quantity: 1 }]
    })
  }, [])

  const removeProduct = useCallback((productId: string) => {
    setProducts(previousState =>
      previousState.filter(
        previousProduct => previousProduct.product.id !== productId
      )
    )
  }, [])

  const increaseQuantity = useCallback((productId: string) => {
    setProducts(previousState =>
      previousState.map(previousProduct => {
        if (previousProduct.product.id === productId)
          return {
            product: previousProduct.product,
            quantity: previousProduct.quantity + 1
          }

        return previousProduct
      })
    )
  }, [])

  const decreaseQuantity = useCallback((productId: string) => {
    setProducts(previousState =>
      previousState.map(previousProduct => {
        if (
          previousProduct.product.id === productId &&
          previousProduct.quantity > 1
        )
          return {
            product: previousProduct.product,
            quantity: previousProduct.quantity - 1
          }

        return previousProduct
      })
    )
  }, [])

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
