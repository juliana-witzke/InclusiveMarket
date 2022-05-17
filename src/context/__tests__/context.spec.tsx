import { ReactElement } from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { Server } from 'miragejs'
import { act } from '@testing-library/react'

import { CartProvider, useCart, CartContext } from '../cartContext'
import { startMirageServer } from '../../miragejs/server'
import { useFetchProducts } from '../../hooks/useFetchProducts'

describe('Cart Context', () => {
  let server: Server
  const wrapper = ({ children }: { children: ReactElement }) => (
    <CartProvider>{children}</CartProvider>
  )

  beforeEach(() => {
    server = startMirageServer({ environment: 'test' })
  })

  afterEach(() => {
    server.shutdown()
  })

  it('should be able to add two different products', async () => {
    server.createList('product', 2)

    const { result: productsResult, waitForNextUpdate } =
      renderHook(useFetchProducts)

    await waitForNextUpdate()

    const availableProducts = productsResult.current.products

    const { result } = renderHook(() => useCart(), {
      wrapper
    })

    const firstProduct = availableProducts[0]
    const secondProduct = availableProducts[1]

    act(() => result.current.addProduct(firstProduct))
    act(() => result.current.addProduct(secondProduct))

    expect(result.current.products.length).toBe(2)
    expect(result.current.products[0]).toEqual({
      product: firstProduct,
      quantity: 1
    })
    expect(result.current.products[1]).toEqual({
      product: secondProduct,
      quantity: 1
    })
  })

  it('should not be able to add the same product twice', async () => {
    server.createList('product', 2)

    const { result: productsResult, waitForNextUpdate } =
      renderHook(useFetchProducts)

    await waitForNextUpdate()

    const availableProducts = productsResult.current.products

    const { result } = renderHook(() => useCart(), {
      wrapper
    })

    const product = availableProducts[0]

    act(() => result.current.addProduct(product))
    act(() => result.current.addProduct(product))
    act(() => result.current.addProduct(product))

    expect(result.current.products.length).toBe(1)
    expect(result.current.products[0]).toEqual({
      product,
      quantity: 1
    })
  })

  it('should be able to remove a product', async () => {
    server.createList('product', 2)

    const { result: productsResult, waitForNextUpdate } =
      renderHook(useFetchProducts)

    await waitForNextUpdate()

    const availableProducts = productsResult.current.products

    const { result } = renderHook(() => useCart(), {
      wrapper
    })

    const firstProduct = availableProducts[0]
    const secondProduct = availableProducts[1]

    act(() => result.current.addProduct(firstProduct))
    act(() => result.current.addProduct(secondProduct))

    act(() => result.current.removeProduct(firstProduct.id))

    expect(result.current.products.length).toBe(1)
    expect(result.current.products[0]).toEqual({
      product: secondProduct,
      quantity: 1
    })
  })

  it("should be able to increase a product's quantity by 1", async () => {
    server.createList('product', 2)

    const { result: productsResult, waitForNextUpdate } =
      renderHook(useFetchProducts)

    await waitForNextUpdate()

    const availableProducts = productsResult.current.products

    const { result } = renderHook(() => useCart(), {
      wrapper
    })

    const firstProduct = availableProducts[0]
    const secondProduct = availableProducts[1]

    act(() => result.current.addProduct(firstProduct))
    act(() => result.current.addProduct(secondProduct))

    act(() => result.current.increaseQuantity(firstProduct.id))
    act(() => result.current.increaseQuantity(firstProduct.id))
    act(() => result.current.increaseQuantity(firstProduct.id))
    act(() => result.current.increaseQuantity(firstProduct.id))

    act(() => result.current.increaseQuantity(secondProduct.id))
    act(() => result.current.increaseQuantity(secondProduct.id))

    expect(result.current.products.length).toBe(2)
    expect(result.current.products[0]).toEqual({
      product: firstProduct,
      quantity: 5
    })
    expect(result.current.products[1]).toEqual({
      product: secondProduct,
      quantity: 3
    })
  })

  it("should be able to decrease a product's quantity by 1", async () => {
    server.createList('product', 2)

    const { result: productsResult, waitForNextUpdate } =
      renderHook(useFetchProducts)

    await waitForNextUpdate()

    const availableProducts = productsResult.current.products

    const { result } = renderHook(() => useCart(), {
      wrapper
    })

    const firstProduct = availableProducts[0]
    const secondProduct = availableProducts[1]

    act(() => result.current.addProduct(firstProduct))
    act(() => result.current.addProduct(secondProduct))

    // Increasing products quantity
    act(() => result.current.increaseQuantity(firstProduct.id))
    act(() => result.current.increaseQuantity(firstProduct.id))

    act(() => result.current.increaseQuantity(secondProduct.id))
    act(() => result.current.increaseQuantity(secondProduct.id))

    // Decreasing products quantity
    act(() => result.current.decreaseQuantity(firstProduct.id))

    act(() => result.current.decreaseQuantity(secondProduct.id))
    act(() => result.current.decreaseQuantity(secondProduct.id))

    expect(result.current.products.length).toBe(2)
    expect(result.current.products[0]).toEqual({
      product: firstProduct,
      quantity: 2
    })
    expect(result.current.products[1]).toEqual({
      product: secondProduct,
      quantity: 1
    })
  })
})

// it.todo("should be able to decrease a product's quantity by 1 but never hit 0")
