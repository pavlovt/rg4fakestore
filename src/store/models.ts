export type TProduct = {
  id: string
  title: string
  price: number
  image: string
  category: string
}

export type TCartProduct = {
  product: TProduct
  qty: number
}
