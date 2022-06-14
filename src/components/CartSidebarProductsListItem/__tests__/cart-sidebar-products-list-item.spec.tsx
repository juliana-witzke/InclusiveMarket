import { render, screen, fireEvent, within, getByLabelText, waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { Server } from 'miragejs'

import { CartSidebarProductsListItem } from '..'
import { useFetchProducts } from '../../../hooks/useFetchProducts'
import { startMirageServer } from '../../../miragejs/server'

let productsQuantity = 5
const decreaseQuantityMock = jest.fn().mockImplementation((productId: string) => { productsQuantity - 1 })
const increaseQuantityMock = jest.fn().mockImplementation((productId: string) => { productsQuantity + 1 })

describe('<CartSidebarProductsListItem />', () => {
  let server: Server
  let cartProducts: ICartProduct[]

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

  beforeEach(() => {
    jest.clearAllMocks()
    renderCartSidebarProductList()
  })

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
    // jest.clearAllMocks()
  })

  it.skip('should render the product with its info', async () => {
    const { product } = cartProducts[0]

    const cartSidebarListItem = await screen.findByRole('listitem')

    const image = within(cartSidebarListItem).getByRole('img', {
      name: product.image.description
    })
    const quantityItem = within(cartSidebarListItem).getByLabelText('Current product quantity')

    expect(image).toBeInTheDocument()
    expect(quantityItem.textContent).toBe(productsQuantity.toString())
  })
  
  it.skip('should be able to increase product cart quantity by 1', async () => {
    const { product } = cartProducts[0]
    
    const cartSidebarListItem = await screen.findByRole('listitem')
    const quantityItem = within(cartSidebarListItem).getByLabelText('Current product quantity')
    const increaseButton = within(cartSidebarListItem).getByRole('button', {
      name: `Increase ${product.title} quantity by 1`
    })
    expect(increaseQuantityMock).not.toHaveBeenCalled()
    fireEvent.click(increaseButton)
    expect(increaseQuantityMock).toHaveBeenCalledTimes(1)
    await waitFor(() => {
      renderCartSidebarProductList()
      expect(quantityItem.textContent).toBe(productsQuantity + 1)
    })
  })
  it.skip('should be able to decrease product cart quantity by 1', async () => {
    const { product } = cartProducts[0]
    
    const cartSidebarListItem = await screen.findByRole('listitem')
    const quantityItem = within(cartSidebarListItem).getByLabelText('Current product quantity')
    const decreaseButton = within(cartSidebarListItem).getByRole('button', {
      name: `Decrease ${product.title} quantity by 1`
    })
    expect(decreaseQuantityMock).not.toHaveBeenCalled()
    fireEvent.click(decreaseButton)
    expect(decreaseQuantityMock).toHaveBeenCalledTimes(1)
    await waitFor(() => {
      renderCartSidebarProductList()
      expect(quantityItem.textContent).toBe(productsQuantity - 1)
    })
  })
})
