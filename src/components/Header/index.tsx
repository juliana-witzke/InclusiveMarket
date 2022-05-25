import Image from 'next/image'
import { FiShoppingCart } from 'react-icons/fi'

import { useCart } from '../../context/cartContext'
import { CartButton, HeaderContainer } from './styles'

interface IHeader {
  openCartSidebar: () => {}
}

export const Header = ({ openCartSidebar }: IHeader): JSX.Element => {
  const { products } = useCart()

  return (
    <HeaderContainer>
      <Image
        src="/images/dehsmarket.png"
        alt="Deh's market logo"
        width={246}
        height={50}
      />

      <CartButton aria-label="Open cart" onClick={openCartSidebar}>
        <span aria-label="Number of products added to cart">
          {products?.length}
        </span>

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
