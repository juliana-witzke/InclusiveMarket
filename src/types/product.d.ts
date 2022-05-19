interface IProduct {
  id: string
  title: string
  price: number
  imageUrl: string
  quantity: number
}

interface ICartProduct {
  product: IProduct
  quantity: number
}
