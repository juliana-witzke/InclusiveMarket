import { renderHook } from '@testing-library/react-hooks'
import { waitFor } from '@testing-library/react'
import { Server } from 'miragejs'
import { startMirageServer } from '../../miragejs/server'

import { useFetchProducts } from '../useFetchProducts'

describe('Hooks', () => {
  let server: Server

  beforeEach(() => {
    server = startMirageServer({ environment: 'test' })
  })

  afterEach(() => {
    server.shutdown()
  })

  it('should return a list of 3 products', async () => {
    server.createList('product', 3)

    const { result } = renderHook(useFetchProducts)

    await waitFor(() => expect(result.current.products.length).toBe(3))
  })
})
// it.todo('should set error to true when request fails')
