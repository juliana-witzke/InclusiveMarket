/* eslint-disable react/display-name */
import { render, screen, fireEvent } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { Server } from 'miragejs'

import { CartSidebar, getCartTotalPrice, ICartSidebar } from '..'
import { CartContext } from '../../../context/cartContext'
import { useFetchProducts } from '../../../hooks/useFetchProducts'
import { startMirageServer } from '../../../miragejs/server'

const closeCartSidebarMock = jest.fn().mockImplementation(() => {})

const cartSidebarProps: ICartSidebar = {
  isHidden: false,
  closeCartSidebar: closeCartSidebarMock
}

describe('<CartSidebar />', () => {
  let server: Server
  let cartProducts: ICartProduct[]

  const fetchProducts = async () => {
    const { result: productsResult, waitForNextUpdate } =
      renderHook(useFetchProducts)

    await waitForNextUpdate()

    return productsResult.current.products
  }

  const renderCartSidebar = ({ isHidden, closeCartSidebar }: ICartSidebar) => {
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
        <CartSidebar isHidden={isHidden} closeCartSidebar={closeCartSidebar} />
      </CartContext.Provider>
    )
  }

  beforeAll(async () => {
    server = startMirageServer({ environment: 'test' })

    server.createList('product', 5)

    cartProducts = (await fetchProducts()).map(product => ({
      product,
      quantity: 1
    }))
  })

  afterAll(() => {
    server.shutdown()
  })

  it('should render a list of 5 products', async () => {
    renderCartSidebar(cartSidebarProps)

    const cartSidebarProductsList = await screen.findByRole('list')

    const cartSidebarProductsListItem =
      cartSidebarProductsList.querySelectorAll('[role="listitem"]')

    expect(cartSidebarProductsListItem.length).toBe(5)
  })

  it('should update total price based on the added products', async () => {
    renderCartSidebar(cartSidebarProps)

    const cartTotalPrice = getCartTotalPrice(cartProducts)

    const cartTotalPriceElement = await screen.findByText(`$ ${cartTotalPrice}`)

    expect(cartTotalPriceElement).toBeInTheDocument()
  })

  it('should close the sidebar when clicking the "x" (close) button ', () => {
    renderCartSidebar(cartSidebarProps)

    const cartSidebar = screen.getByRole('complementary', { hidden: false })

    expect(cartSidebar).toBeVisible()
    expect(cartSidebar).toHaveAttribute('aria-hidden', 'false')

    const closeButtonElement = screen.getByLabelText('Close cart')

    fireEvent.click(closeButtonElement)

    expect(closeCartSidebarMock).toHaveBeenCalledTimes(1)
  })
})
