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

export interface ICartSidebar {
  closeCartSidebar: () => void
  isHidden: boolean
}

export const getCartTotalPrice = (products: ICartProduct[]) => {
  let totalPrice: number = 0

  products.map(
    product => (totalPrice += product.product.price * product.quantity)
  )

  return totalPrice.toFixed(2)
}

export const CartSidebar = ({
  closeCartSidebar,
  isHidden
}: ICartSidebar): JSX.Element => {
  const { products, increaseQuantity, decreaseQuantity, removeProduct } = useCart()

  return (
    <>
      <Sidebar
        aria-hidden={isHidden}
        style={{ display: isHidden ? 'none' : 'flex' }}
      >
        <Header>
          <CloseButton aria-label={'Close'} onClick={closeCartSidebar}>
            <FiX size={26} color="#fd7272" />
          </CloseButton>

          <h3>Cart</h3>
        </Header>

        <CartSidebarProductsList role="list">
          {products?.map(({ product, quantity }) => (
            <CartSidebarProductsListItem
              key={product.id}
              product={product}
              quantity={quantity}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeProduct={removeProduct}
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

      <Overlay
        aria-hidden={false}
        style={{ display: isHidden ? 'none' : 'flex' }}
      />
    </>
  )
}
