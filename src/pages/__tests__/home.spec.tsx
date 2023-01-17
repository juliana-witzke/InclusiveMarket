/* eslint-disable react/display-name */
import { render, screen, fireEvent } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { Server } from 'miragejs'

import Home from '..'
import { CartContext } from '../../context/cartContext'
import { useFetchProducts } from '../../hooks/useFetchProducts'
import { startMirageServer } from '../../miragejs/server'

describe('<Home />', () => {
  let server: Server
  let cartProducts: ICartProduct[]
  const numberOfProducts = 9

  const fetchProducts = async () => {
    const { result: productsResult, waitForNextUpdate } =
      renderHook(useFetchProducts)

    await waitForNextUpdate()

    return productsResult.current.products
  }

  const renderHome = () => {
    return render(
      <CartContext.Provider
        value={{
          products: cartProducts,
          addProduct: () => {},
          removeProduct: () => {},
          increaseQuantity: () => {},
          decreaseQuantity: () => {},
          getNumberOfProductsInTheCart: () => 0
        }}
      >
        <Home />
      </CartContext.Provider>
    )
  }

  beforeAll(async () => {
    server = startMirageServer({ environment: 'test' })

    server.createList('product', numberOfProducts)

    cartProducts = (await fetchProducts()).map(product => ({
      product,
      quantity: 1
    }))
  })

  afterAll(() => {
    server.shutdown()
  })

  it('should display product list', async () => {
    renderHome()
    const productList = await screen.findByRole('list')
    expect(productList).toBeVisible()
  })

  it('should open cart sidebar when clicking on the header button', async () => {
    renderHome()

    const openCartSidebarButton = await screen.findByRole('button', {
      name: 'Open cart'
    })

    fireEvent.click(openCartSidebarButton)

    const cartSidebar = await screen.findByRole('complementary', {
      hidden: false
    })

    expect(cartSidebar).toBeVisible()
    expect(cartSidebar).toHaveAttribute('aria-hidden', 'false')
  })

  it('should change sidebar visibility when clicking the "x" (close) button', async () => {
    renderHome()

    const openCartSidebarButton = await screen.findByRole('button', {
      name: 'Open cart'
    })

    fireEvent.click(openCartSidebarButton)

    const cartSidebar = await screen.findByRole('complementary', {
      hidden: false
    })

    const closeButtonElement = screen.getByLabelText('Close cart')

    fireEvent.click(closeButtonElement)

    expect(cartSidebar).not.toBeVisible()
    expect(cartSidebar).toHaveAttribute('aria-hidden', 'true')
  })
})
