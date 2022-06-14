import { render, within, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { Server } from 'miragejs'

import { useFetchProducts } from '../../../hooks/useFetchProducts'
import { startMirageServer } from '../../../miragejs/server'
import { ProductList } from '..'

describe('<ProductList />', () => {
  let server: Server
  let availableProducts: IProduct[];
  const productsQuantity = 5;
  const fetchProducts = async () => {
      const { result: productsResult, waitForNextUpdate } =
          renderHook(useFetchProducts)
      await waitForNextUpdate()
      return productsResult.current.products
  }
  

  beforeAll(async () => {
      server = startMirageServer({ environment: 'test' })
      server.createList('product', productsQuantity)
      availableProducts = (await fetchProducts())
  })
  
  beforeEach(() => {
      jest.clearAllMocks()
      render(<ProductList products={availableProducts} />);
  })

  afterAll(() => {
      server.shutdown()
  })
  it('should render the a list of 5 products', () => {
    const productsContainer = screen.getByRole('list')
    const productCards = within(productsContainer).getAllByRole('listitem')
    expect(productCards.length).toBe(productsQuantity)
  })
})
