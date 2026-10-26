import { createContext, use } from 'react'
import type { PeliculaResumen } from '@/features/peliculas/models/pelicula'

// Un canal para pasar las favoritas a cualquier componente del árbol, sin prop drilling.
export interface FavoritasValor {
  favoritas: PeliculaResumen[]
  esFavorita: (id: number) => boolean
  alternar: (pelicula: PeliculaResumen) => void
}

export const FavoritasContext = createContext<FavoritasValor | null>(null)

export function useFavoritas() {
  const valor = use(FavoritasContext)
  if (!valor) throw new Error('useFavoritas debe usarse dentro de <FavoritasProvider>')
  return valor
}
