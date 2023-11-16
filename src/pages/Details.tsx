import { isEmpty } from 'lodash-es'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { core } from '../core'
import { Dispatch, RootState } from '../store'

function Cmp() {
  const { id } = useParams()
  const dispatch = useDispatch<Dispatch>()
  const product = useSelector((state: RootState) => state.products.one)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch.products.getOne(Number(id))
  }, [dispatch.products, id])

  useEffect(() => {
    if (isEmpty(product)) return

    tag('event', 'view_item', {
      currency: 'USD',
      value: product.price,
      items: core.products2gtag([product]),
    })

    tag('set', 'user_data', {
      email: 'test@email.com',
      phone_number: '5555551234',
    })
  }, [product])

  const add = (product: any) => {
    dispatch.cart.add({ product, qty: 1 })
    tag('event', 'add_to_cart', {
      currency: 'USD',
      value: product.price,
      items: core.products2gtag([product]),
    })
    navigate('/')
  }

  return (
    <div className="App">
      <h1 tw="text-5xl pb-3">Product Details</h1>
      <h2 tw="text-3xl pb-3">{product?.title}</h2>
      <p>
        <strong>Price:</strong> {product?.price}
      </p>
      <p>
        <button onClick={() => add(product)}>Add to cart</button>
      </p>
    </div>
  )
}

export default Cmp
