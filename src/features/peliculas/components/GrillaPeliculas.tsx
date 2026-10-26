import type { PeliculaResumen } from '../models/pelicula'
import { PeliculaCard } from './PeliculaCard'

interface Props {
  peliculas: PeliculaResumen[]
}

//* Listas: .map() convierte cada dato en un elemento JSX.
//* `key` le dice a React cuál es cuál entre renders (como track en @for). Usa el id, nunca el índice.
// Las favoritas ya no bajan por props: cada tarjeta las lee del contexto.
export function GrillaPeliculas({ peliculas }: Props) {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
      {peliculas.map((p) => (
        <PeliculaCard key={p.id} pelicula={p} />
      ))}
    </div>
  )
}
