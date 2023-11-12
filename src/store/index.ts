import { Models, RematchDispatch, RematchRootState, init } from '@rematch/core'
import cart from './cart'
import { TCartProduct, TProduct } from './models'
import products from './products'

export interface RootModel extends Models<RootModel> {
  products: typeof products
  cart: typeof cart
}

export const models: RootModel = {
  products,
  cart,
}

export type Model = {
  product: TProduct
  cart: TCartProduct
}

export const store = init<RootModel>({
  models,
})

export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>
