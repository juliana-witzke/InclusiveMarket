import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { Header } from '../components/Header'
import { ProductList } from '../components/ProductList'
import { useFetchProducts } from '../hooks/useFetchProducts'
import { CartSidebar } from '../components/CartSidebar'

const Home: NextPage = () => {
  const { products } = useFetchProducts()

  const [showCartSidebar, setShowCartSidebar] = useState(false)

  return (
    <div>
      <Head>
        <title>Aplicação Fullstack de Acessibilidade Digital com TDD</title>
      </Head>

      <Header showCartSidebar={showCartSidebar} openCartSidebar={() => setShowCartSidebar(true)} />

      <CartSidebar
        closeCartSidebar={() => setShowCartSidebar(false)}
        isHidden={!showCartSidebar}
        role="dialog"
      />

      <ProductList products={products} />
    </div>
  )
}

export default Home
