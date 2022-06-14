/* eslint-disable react/display-name */
import { render, screen, fireEvent, within } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { Server } from 'miragejs'

import { CartSidebarProductsListItem } from '..'
import { useFetchProducts } from '../../../hooks/useFetchProducts'
import { startMirageServer } from '../../../miragejs/server'

const decreaseQuantityMock = jest.fn().mockImplementation(() => {})
const increaseQuantityMock = jest.fn().mockImplementation(() => {})

describe('<CartSidebarProductsListItem />', () => {
  let server: Server
  let cartProducts: ICartProduct[]
  const productsQuantity = 5

  const fetchProducts = async () => {
    const { result: productsResult, waitForNextUpdate } =
      renderHook(useFetchProducts)

    await waitForNextUpdate()

    return productsResult.current.products
  }

  const renderCartSidebarProductList = () => {
    return render(
      <div>
        {cartProducts.map(cartProduct => (
          <CartSidebarProductsListItem
            product={cartProduct.product}
            quantity={cartProduct.quantity}
            key={cartProduct.product.id}
            increaseQuantity={increaseQuantityMock}
            decreaseQuantity={decreaseQuantityMock}
          />
        ))}
      </div>
    )
  }

  beforeAll(async () => {
    server = startMirageServer({ environment: 'test' })

    server.createList('product', 1)

    cartProducts = (await fetchProducts()).map(product => ({
      product,
      quantity: productsQuantity
    }))
  })

  afterAll(() => {
    server.shutdown()
  })

  it('should render the product with its info', async () => {
    renderCartSidebarProductList()

    const { product } = cartProducts[0]

    const cartSidebarListItem = await screen.findByRole('listitem')

    const image = within(cartSidebarListItem).getByRole('img', {
      name: product.image.description
    })
    const quantity = within(cartSidebarListItem).getByText(productsQuantity.toString())
    expect(image).toBeInTheDocument()
    expect(quantity).toBeInTheDocument()
  })

  it.todo('should render a list of 5 products with their info')
  it.todo('should be able to increase quantity by 1')
  it.todo('should be able to decrease quantity by 1')
})
