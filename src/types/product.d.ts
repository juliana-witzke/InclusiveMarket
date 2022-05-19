interface IProduct {
  id: string
  title: string
  price: string
  imageUrl: string
  quantity: number
}

interface ICartProduct {
  product: IProduct
  quantity: number
}
