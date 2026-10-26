import { RouterProvider } from 'react-router/dom'
import { router } from './app/router'
import { FavoritasProvider } from './core/favoritas/FavoritasProvider'

// App es el componente raíz: el Provider publica las favoritas y el router decide qué página se ve
export default function App() {
  return (
    <FavoritasProvider>
      <RouterProvider router={router} />
    </FavoritasProvider>
  )
}
