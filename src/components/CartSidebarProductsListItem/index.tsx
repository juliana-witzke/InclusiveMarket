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
  increaseQuantity: (productId: string) => void
  decreaseQuantity: (productId: string) => void
  removeProduct: (productId: string) => void
}

export const CartSidebarProductsListItem = ({
  product,
  quantity,
  increaseQuantity,
  decreaseQuantity,
  removeProduct
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
          <MinusButton  aria-label={`Decrease ${product.title} quantity by 1`} onClick={() => decreaseQuantity(product.id)}>
            <FiMinus size={22} color="#fff" />
          </MinusButton>

          <Quantity aria-label='Current product quantity'>{quantity}</Quantity>

          <PlusButton aria-label={`Increase ${product.title} quantity by 1`} onClick={() => increaseQuantity(product.id)}>
            <FiPlus size={22} color="#fff" />
          </PlusButton>

          <RemoveButton aria-label={`Remove ${product.title} from cart`} onClick={() => removeProduct(product.id)}>
            <FiTrash2 size={22} color="#008924" />
          </RemoveButton>
        </Actions>
      </Container>
    </>
  )
}
