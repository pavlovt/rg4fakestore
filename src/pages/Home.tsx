import { isEmpty } from 'lodash-es'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { core } from '../core'
import { Dispatch, Model, RootState } from '../store'

function Cmp() {
  const dispatch = useDispatch<Dispatch>()
  const products = useSelector((state: RootState) => state.products.data)

  useEffect(() => {
    dispatch.products.getMany()
  }, [dispatch.products])

  useEffect(() => {
    if (isEmpty(products)) return

    tag(
      'event',
      'view_item_list',
      {
        items: core.products2gtag(products),
      },
      { debug_mode: true },
    )

    tag('set', 'user_data', {
      email: 'test@email.com',
      phone_number: '5555551234',
    })
  }, [products])

  const tableRow = (row: Model['product']) => (
    <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {row.title}
      </th>
      <td className="px-6 py-4">${row.price}</td>
      <td className="px-6 py-4">{row.category}</td>
      <td className="px-6 py-4">
        <a href={`details/${row.id}`}>View</a>
      </td>
    </tr>
  )

  return (
    <div className="App">
      <h1 className="pb-3 text-5xl">Home</h1>

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
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>{products.map(v => tableRow(v))}</tbody>
      </table>
    </div>
  )
}

export default Cmp
