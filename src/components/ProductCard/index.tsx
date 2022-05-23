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
  product: IProduct,
  handleAddToCart: (product: IProduct) => {}
}

export const ProductCard = ({ product, handleAddToCart }: IProductProps): JSX.Element => {
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

      <AddButton aria-label={`Add ${product.title.toLowerCase()} to cart`} onClick={() => handleAddToCart(product)}>
        <FiPlus size={22} color="#fff" />
      </AddButton>
    </Container>
  )
}
