/* eslint-disable react/display-name */
import { render, screen, fireEvent } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { Server } from 'miragejs'
import { ProductCard } from '..'

import { useFetchProducts } from '../../../hooks/useFetchProducts'
import { startMirageServer } from '../../../miragejs/server'

describe("<ProductCard />", () => {
    let server: Server
    const fetchProducts = async () => {
        const { result: productsResult, waitForNextUpdate } =
            renderHook(useFetchProducts)
        await waitForNextUpdate()
        return productsResult.current.products
    }

    beforeAll(async () => {
        server = startMirageServer({ environment: 'test' })
    
        server.createList('product', 5)
    })
    
    afterAll(() => {
        server.shutdown()
    })

    it('should render the product card component with product info', async () => {
        const availableProduct = (await fetchProducts())[0]
        render(<ProductCard product={availableProduct} />);
        expect(screen.getByText(availableProduct.title)).toBeInTheDocument();
        const img = screen.getByAltText(availableProduct.image.description);
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute("src", availableProduct.image.url)
        expect(screen.getByText(availableProduct.price, { exact: false })).toBeInTheDocument();
    })
})