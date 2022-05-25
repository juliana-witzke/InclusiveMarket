
import Image from 'next/image'
import { FiShoppingCart } from 'react-icons/fi'

import { useCart } from '../../context/cartContext'
import { CartButton, HeaderContainer,  } from './styles'

export const Header = (): JSX.Element => {
  const { addProduct } = useCart()

  return (
    <HeaderContainer>
        <Image src="/images/dehsmarket.png" alt="" width={246} height={50} />

        <CartButton onClick={() => {}}>
          <span>0</span>

          <FiShoppingCart size={22} color="#fff" />
        </CartButton>
      </HeaderContainer>
  )
}
