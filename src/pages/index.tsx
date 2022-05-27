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
        {/*eslint-disable-next-line react/no-unescaped-entities*/}
        <title>Deh's Market</title>
      </Head>

      <Header openCartSidebar={() => setShowCartSidebar(true)} />

      <CartSidebar
        closeCartSidebar={() => setShowCartSidebar(false)}
        isHidden={!showCartSidebar}
      />

      <ProductList products={products} />
    </div>
  )
}

export default Home
