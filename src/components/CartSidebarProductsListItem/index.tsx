import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'

import {
  Container,
  ImageContainer,
  ProductImage,
  ProductDetails,
  Title,
  Price,
  Unit,
  Actions,
  Quantity,
  MinusButton,
  PlusButton,
  RemoveButton
} from './styles'

interface ICartSidebarProductsListItem extends ICartProduct {
  increaseQuantity: () => {}
  decreaseQuantity: () => {}
}

export const CartSidebarProductsListItem = ({
  product,
  quantity,
  increaseQuantity,
  decreaseQuantity
}: ICartSidebarProductsListItem): JSX.Element => {
  return (
    <>
      <Container role="listitem">
        <ImageContainer>
          <ProductImage
            src={product.image.url}
            alt={product.image.description}
          />
        </ImageContainer>

        <ProductDetails>
          <Title>{product.title}</Title>
          <Price>
            ${product.price} <Unit>/kg</Unit>
          </Price>
        </ProductDetails>

        <Actions>
          <MinusButton>
            <FiMinus size={22} color="#fff" />
          </MinusButton>

          <Quantity aria-label='Current product quantity'>{quantity}</Quantity>

          <PlusButton aria-label={`Increase ${product.title} quantity by 1`} onClick={increaseQuantity}>
            <FiPlus size={22} color="#fff" />
          </PlusButton>

          <RemoveButton>
            <FiTrash2 size={22} color="#fd7272" />
          </RemoveButton>
        </Actions>
      </Container>
    </>
  )
}
