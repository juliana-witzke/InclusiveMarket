import { FiPlus } from 'react-icons/fi'

import {
  Container,
  ImageContainer,
  ProductImage,
  ProductDetails,
  Title,
  Price,
  Unit,
  AddButton
} from './styles'

interface IProductProps {
  product: IProduct
}

export const ProductCard = ({ product }: IProductProps): JSX.Element => {
  return (
    <Container data-testid="product-card">
      <ImageContainer>
        <ProductImage
          src={product.image.url}
          alt={product.image.description}
          data-testid="product-image"
        />
      </ImageContainer>

      <ProductDetails>
        <Title>{product.title}</Title>
        <Price>
          ${product.price} <Unit>/kg</Unit>
        </Price>
      </ProductDetails>

      <AddButton>
        <FiPlus size={22} color="#fff" />
      </AddButton>
    </Container>
  )
}
