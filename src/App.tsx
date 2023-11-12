import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { conf } from './core'
import { About, Cart, Checkout1, Checkout2, Checkout3, Details, Home } from './pages'

const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/about',
    Component: About,
  },
  {
    path: '/cart',
    Component: Cart,
  },
  {
    path: '/details/:id',
    Component: Details,
  },
  {
    path: '/checkout1',
    Component: Checkout1,
  },
  {
    path: '/checkout2',
    Component: Checkout2,
  },
  {
    path: '/checkout3',
    Component: Checkout3,
  },
])

function App() {
  return (
    <div className="App">
      <nav>
        <ul className="flex justify-start">
          {conf.menu.map((item: any) => (
            <li key={item.title} className="pr-3">
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      </nav>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
