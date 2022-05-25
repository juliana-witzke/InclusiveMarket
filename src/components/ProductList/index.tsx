import { useCart } from '../../context/cartContext'
import { ProductCard } from '../ProductCard'
import { ProductsContainer } from './styles'

interface IProductList {
  products: IProduct[]
}

export const ProductList = ({ products }: IProductList): JSX.Element => {
  const { addProduct } = useCart()

  return (
    <ProductsContainer>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          handleAddToCart={addProduct}
        />
      ))}
    </ProductsContainer>
  )
}
