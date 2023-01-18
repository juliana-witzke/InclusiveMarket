import Image from 'next/image'
import { FiShoppingCart } from 'react-icons/fi'

import { useCart } from '../../context/cartContext'
import { CartButton, HeaderContainer, LogoContainer, ContentContainer } from './styles'

interface IHeader {
  openCartSidebar: () => void
}

export const Header = ({ openCartSidebar }: IHeader): JSX.Element => {
  const { numberOfProductsInTheCart } = useCart()

  return (
    <HeaderContainer>
      <ContentContainer>
        <LogoContainer>
          <Image
            src="/images/dehsmarket.svg"
            alt="Inclusive market logo"
            width="100%"
            height={75}
          />
          <h1>Inclusive Market</h1>
        </LogoContainer>

        <CartButton aria-label="Open cart" onClick={openCartSidebar}>
          <span aria-label="Number of products added to cart">
            {numberOfProductsInTheCart}
          </span>

          <FiShoppingCart size={22} color="#fff" role="img" />
        </CartButton>
      </ContentContainer>
    </HeaderContainer>
  )
}
