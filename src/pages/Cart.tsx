import { isEmpty } from 'lodash-es'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { core } from '../core'
import { Model, RootState } from '../store'

function Cmp() {
  const cart = useSelector((state: RootState) => state.cart.data)
  const navigate = useNavigate()

  useEffect(() => {
    if (isEmpty(cart)) return

    gtag(
      'event',
      'view_cart',
      {
        currency: 'USD',
        value: cart.map(v => v.price).reduce((partialSum, price) => partialSum + price, 0),
        items: core.products2gtag(cart),
      },
      { debug_mode: true },
    )

    gtag('set', 'user_data', {
      email: 'test@email.com',
      phone_number: '5555551234',
    })
  }, [cart])

  const tableRow = (row: Model['cart']) => (
    <tr key={row.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {row.product.title}
      </th>
      <td className="px-6 py-4">${row.product.price}</td>
      <td className="px-6 py-4">{row.qty}</td>
      <td className="px-6 py-4">
        <a href={`details/${row.product.id}`}>Delete</a>
      </td>
    </tr>
  )

  return (
    <div className="App">
      <h1 tw="text-5xl pb-3">Cart</h1>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>{cart.map(v => tableRow(v))}</tbody>
      </table>

      <button onClick={() => navigate('checkout1')}>Checkout</button>
    </div>
  )
}

export default Cmp
