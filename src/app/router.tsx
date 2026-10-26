import { createBrowserRouter, redirect } from 'react-router'
import { Layout } from '@/core/layout/Layout'
import { NoEncontrada } from '@/core/layout/NoEncontrada'
import { MisFavoritas } from '@/features/favoritas/pages/MisFavoritas'
import { CatalogoPeliculas } from '@/features/peliculas/pages/CatalogoPeliculas'
import { DetallePelicula } from '@/features/peliculas/pages/DetallePelicula'
import { DetallePersona } from '@/features/personas/pages/DetallePersona'

// El mapa de la app: todas las páginas son hijas de Layout
export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, loader: () => redirect('/peliculas') },
      { path: 'peliculas', Component: CatalogoPeliculas },
      { path: 'peliculas/:id', Component: DetallePelicula },
      { path: 'personas/:id', Component: DetallePersona },
      { path: 'favoritas', Component: MisFavoritas },
      { path: '*', Component: NoEncontrada },
    ],
  },
])
