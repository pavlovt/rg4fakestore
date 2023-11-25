import { isEmpty } from 'lodash-es'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { core } from '../core'
import { RootState } from '../store'

function Cmp() {
  const navigate = useNavigate()
  const cart = useSelector((state: RootState) => state.cart.data)

  useEffect(() => {
    if (isEmpty(cart)) return

    gtag('event', 'add_shipping_info', {
      currency: 'USD',
      value: cart.map(v => v.product.price).reduce((partialSum, price) => partialSum + price, 0),
      items: core.products2gtag(cart.map(v => v.product)),
    })
  }, [cart])

  return (
    <div>
      <h1 tw="text-5xl">Checkout 2 Shipping</h1>

      <button onClick={() => navigate('/checkout3')}>Next</button>
    </div>
  )
}

export default Cmp
