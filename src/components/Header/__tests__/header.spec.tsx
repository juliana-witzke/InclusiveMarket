/* eslint-disable react/display-name */
import { render, screen, fireEvent } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { Server } from 'miragejs'

import { Header } from '..'
import { CartContext } from '../../../context/cartContext'
import { useFetchProducts } from '../../../hooks/useFetchProducts'
import { startMirageServer } from '../../../miragejs/server'

describe('<Header />', () => {
  let server: Server
  let cartProducts: ICartProduct[]

  const fetchProducts = async () => {
    const { result: productsResult, waitForNextUpdate } =
      renderHook(useFetchProducts)

    await waitForNextUpdate()

    return productsResult.current.products
  }

  const renderHeader = () => {
    return render(
      <CartContext.Provider
        value={{
          products: cartProducts,
          addProduct: () => {},
          removeProduct: () => {},
          increaseQuantity: () => {},
          decreaseQuantity: () => {}
        }}
      >
        <Header />
      </CartContext.Provider>
    )
  }

  it('should render application logo with an alternative text', async () => {
    renderHeader()

    const applicationLogo = await screen.findByAltText("Deh's market logo")

    expect(applicationLogo).toBeInTheDocument()
  })

  it('should show 0 products added on cart button when nothing was added to cart', () => {
    cartProducts = []

    renderHeader()

    const cartTotalPriceElement = screen.getByLabelText(
      'Number of products added to cart'
    )

    expect(cartTotalPriceElement).toBeInTheDocument()
    expect(cartTotalPriceElement.textContent).toBe('0')
  })

  it('should show the correct number of products added on cart button when something was added to cart', async () => {
    const numberOfProducts = 9

    server = startMirageServer({ environment: 'test' })

    server.createList('product', numberOfProducts)

    cartProducts = (await fetchProducts()).map(product => ({
      product,
      quantity: 1
    }))

    renderHeader()

    const cartTotalPriceElement = screen.getByLabelText(
      'Number of products added to cart'
    )

    expect(cartTotalPriceElement).toBeInTheDocument()
    expect(cartTotalPriceElement.textContent).toBe(numberOfProducts.toString())

    server.shutdown()
  })
})