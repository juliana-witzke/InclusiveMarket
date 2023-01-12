import Image from 'next/image'
import { FiShoppingCart } from 'react-icons/fi'

import { useCart } from '../../context/cartContext'
import { CartButton, HeaderContainer } from './styles'

interface IHeader {
  openCartSidebar: () => void
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
      <h1>Inclusive Market</h1>

      <CartButton aria-label="Open cart" onClick={openCartSidebar}>
        <span aria-label="Number of products added to cart">
          {products?.length}
        </span>

        <FiShoppingCart
          size={22}
          color="#fff"
          role="img"
        />
      </CartButton>
    </HeaderContainer>
  )
}
