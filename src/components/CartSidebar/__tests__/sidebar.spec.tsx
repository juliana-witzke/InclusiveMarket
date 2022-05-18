/* eslint-disable react/display-name */
import { render, screen, waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { Server } from 'miragejs'
import { ReactElement } from 'react'

import { CartSidebar } from '..'
import { CartContext } from '../../../context/cartContext'
import { useFetchProducts } from '../../../hooks/useFetchProducts'
import { startMirageServer } from '../../../miragejs/server'

describe('Cart Sidebar', () => {
  let server: Server
  let cartProducts: IProduct[]
  let wrapper: ({ children }: { children: ReactElement }) => JSX.Element

  const fetchProducts = async () => {
    const { result: productsResult, waitForNextUpdate } =
      renderHook(useFetchProducts)

    await waitForNextUpdate()

    return productsResult.current.products
  }

  const renderCartSidebar = () => {
    return render(
      <CartContext.Provider
        value={{
          products: cartProducts.map(product => ({
            product,
            quantity: 1
          })),
          addProduct: () => {},
          removeProduct: () => {},
          increaseQuantity: () => {},
          decreaseQuantity: () => {}
        }}
      >
        <CartSidebar />
      </CartContext.Provider>
    )
  }

  beforeAll(async () => {
    server = startMirageServer({ environment: 'test' })

    server.createList('product', 5)

    cartProducts = await fetchProducts()
  })

  afterAll(() => {
    server.shutdown()
  })

  it.only('should render a list of 5 products', async () => {
    renderCartSidebar()

    const cartSidebarProductsList = await screen.findByRole('list')

    const cartSidebarProductsListItem =
      cartSidebarProductsList.querySelectorAll('[role="listitem"]')

    expect(cartSidebarProductsListItem.length).toBe(5)
  })

  it.todo('update total price based on the added products and their quantities')
})
