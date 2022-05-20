import { useState } from 'react'
import { FiX } from 'react-icons/fi'

import { CartSidebarProductsListItem } from '../CartSidebarProductsListItem'
import {
  Overlay,
  Sidebar,
  Header,
  CloseButton,
  CartSidebarProductsList,
  Footer,
  TotalPrice,
  CtaButton
} from './styles'
import { useCart } from '../../context/cartContext'

export const getCartTotalPrice = (products: ICartProduct[]) => {
  let totalPrice: number = 0

  products.map(
    product => (totalPrice += product.product.price * product.quantity)
  )

  return totalPrice.toFixed(2)
}

export const CartSidebar = (): JSX.Element => {
  const { products } = useCart()
  const [ showSidebar, setShowSidebar ] = useState(true);

  return (
    <>
      <Sidebar aria-hidden={!showSidebar} style={{ display: showSidebar ? 'flex' : 'none'}}>
        <Header>
          <CloseButton aria-label={'Close'} onClick={() => setShowSidebar(false)}>
            <FiX size={26} color="#fd7272" />
          </CloseButton>

          <h3>Cart</h3>
        </Header>

        <CartSidebarProductsList role="list">
          {products?.map(({ product, quantity }) => (
            <CartSidebarProductsListItem
              key={product.id}
              product={{ ...product, quantity }}
            />
          ))}
        </CartSidebarProductsList>

        <Footer>
          <TotalPrice>
            <p>Total</p>

            <p>$ {getCartTotalPrice(products)}</p>
          </TotalPrice>

          <CtaButton>place order</CtaButton>
        </Footer>
      </Sidebar>

      <Overlay aria-hidden={false} style={{ display: showSidebar ? 'flex' : 'none'}} />
    </>
  )
}
