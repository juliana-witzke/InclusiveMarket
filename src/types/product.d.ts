interface IProduct {
  id: string
  title: string
  price: number
  image: {
    url: string,
    description: string,
  }
  quantity: number
}

interface ICartProduct {
  product: IProduct
  quantity: number
}
