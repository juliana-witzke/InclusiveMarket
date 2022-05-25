import Image from 'next/image'
import { FiShoppingCart } from 'react-icons/fi'

import { useCart } from '../../context/cartContext'
import { CartButton, HeaderContainer } from './styles'

export const Header = (): JSX.Element => {
  const { addProduct } = useCart()

  return (
    <HeaderContainer>
      <Image
        src="/images/dehsmarket.png"
        alt="Deh's market logo"
        width={246}
        height={50}
      />

      <CartButton onClick={() => {}}>
        <span aria-label="Number of products added to cart">0</span>

        <FiShoppingCart
          size={22}
          color="#fff"
          aria-label="Shopping cart icon"
          role="img"
        />
      </CartButton>
    </HeaderContainer>
  )
}
