import { useConsulta } from '@/shared/hooks/useConsulta'
import type { Orden } from '../models/pelicula'
import { buscar, descubrir, obtenerDetalle, obtenerGeneros } from '../services/peliculas.service'

// Hooks de la feature: combinan useConsulta con el servicio.

interface Filtros {
  busqueda: string
  genero?: number
  orden: Orden
  pagina: number
}

// Con texto se busca; sin texto se descubre por género y orden
export function usePeliculas({ busqueda, genero, orden, pagina }: Filtros) {
  const clave = busqueda ? `buscar|${busqueda}|${pagina}` : `descubrir|${genero ?? ''}|${orden}|${pagina}`
  return useConsulta(clave, (signal) =>
    busqueda ? buscar(busqueda, pagina, signal) : descubrir({ pagina, genero, orden }, signal),
  )
}

// Si falla, el filtro de géneros simplemente queda vacío
export function useGeneros() {
  const { datos } = useConsulta('generos', obtenerGeneros)
  return datos ?? []
}

export function usePelicula(id: number) {
  return useConsulta(`pelicula|${id}`, (signal) => obtenerDetalle(id, signal))
}
