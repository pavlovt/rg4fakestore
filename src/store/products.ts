import { createModel } from '@rematch/core'
import { api, conf } from '../core'
import type { RootModel } from './index'
import { TProduct } from './models'

type TState = { data: TProduct[]; one?: TProduct }

const InitialState: TState = {
  data: [],
  one: undefined,
}

const products = createModel<RootModel>()({
  state: InitialState,
  reducers: {
    setMany(state, payload: TState) {
      const { data } = payload

      return {
        ...state,
        data,
      }
    },
    setOne(state, payload: { data: TProduct }) {
      const { data } = payload

      return {
        ...state,
        one: data,
      }
    },
    clearData() {
      return InitialState
    },
  },
  effects: (dispatch: any) => ({
    clearState() {
      dispatch.units.clearData()
    },
    async getMany() {
      try {
        const response: TProduct[] = await api.get(conf.apis.products)

        dispatch.products.setMany({
          data: response,
        })
      } catch (error) {
        console.log(error)
      }
    },
    async getOne(id: number) {
      try {
        const response: TProduct = await api.get(`${conf.apis.products}/${id}`)

        dispatch.products.setOne({
          data: response,
        })
      } catch (error) {
        console.log(error)
      }
    },
  }),
})

export default products
