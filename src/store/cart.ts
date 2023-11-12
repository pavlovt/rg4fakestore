import { createModel } from '@rematch/core'
import { core } from '../core'
import type { RootModel } from './index'
import { TCartProduct } from './models'

type TState = { data: TCartProduct[] }

const InitialState: TState = {
  data: [],
}

const data = core.getLocalStorage('g4cart') || InitialState

const cart = createModel<RootModel>()({
  state: { ...data },
  reducers: {
    getMany() {
      const data = core.getLocalStorage('g4cart') || InitialState

      return data
    },

    setMany(state, payload: TState) {
      const { data } = payload

      return {
        ...state,
        data,
      }
    },
    add(state, payload: TCartProduct) {
      const { product } = payload
      const newState: TState = {
        data: state.data.filter(v => v.product.id !== product.id),
      }

      newState.data.push(payload)
      core.saveLocalStorage('g4cart', newState)

      return {
        ...newState,
      }
    },
    clearData() {
      core.removeLocalStorage('g4cart')
      return InitialState
    },
  },
  effects: (dispatch: any) => ({
    clearState() {
      dispatch.cart.clearData()
    },
    // add(product: TProduct, qty: number) {
    //   dispatch.cart.setOne(product, qty)
    // },
  }),
})

export default cart
