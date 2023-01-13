import Image from 'next/image'
import { FiShoppingCart } from 'react-icons/fi'

import { useCart } from '../../context/cartContext'
import { CartButton, HeaderContainer, LogoContainer } from './styles'

interface IHeader {
  openCartSidebar: () => void
}

export const Header = ({ openCartSidebar }: IHeader): JSX.Element => {
  const { products } = useCart()

  return (
    <HeaderContainer>
      <LogoContainer>
        <Image
          src="/images/dehsmarket.svg"
          alt="Inclusive market's logo"
          width="100%"
          height={75}
        />
        <h1>Inclusive Market</h1>
      </LogoContainer>

      <CartButton aria-label="Open cart" onClick={openCartSidebar}>
        <span aria-label="Number of products added to cart">
          {products?.length}
        </span>

        <FiShoppingCart size={22} color="#fff" role="img" />
      </CartButton>
    </HeaderContainer>
  )
}
