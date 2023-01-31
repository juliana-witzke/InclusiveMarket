import Image from 'next/image'
import { FiShoppingCart } from 'react-icons/fi'

import { useCart } from '../../context/cartContext'
import {
  CartButton,
  HeaderContainer,
  LogoContainer,
  ContentContainer,
  SkipToMainContentLink
} from './styles'

interface IHeader {
  openCartSidebar: () => void,
  showCartSidebar: boolean
}

export const Header = ({ openCartSidebar, showCartSidebar }: IHeader): JSX.Element => {
  const { numberOfProductsInTheCart } = useCart()

  return (
    <HeaderContainer>
      {showCartSidebar}
      {!showCartSidebar && (
        <SkipToMainContentLink href="#main-content">
          Skip to main content
        </SkipToMainContentLink>
      )}

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
