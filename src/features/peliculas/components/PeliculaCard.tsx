import { Film } from 'lucide-react'
import { Link } from 'react-router'
import { useFavoritas } from '@/core/favoritas/favoritas-context'
import { imagen } from '@/core/config/tmdb'
import { anio, type PeliculaResumen } from '../models/pelicula'
import { BotonFavorito } from './BotonFavorito'
import { Calificacion } from './Calificacion'

// Las props se describen con una interface. TypeScript avisa si falta alguna.
interface Props {
  pelicula: PeliculaResumen
}

// La película llega por props; el estado de favorita lo lee del contexto.
export function PeliculaCard({ pelicula }: Props) {
  const { esFavorita, alternar } = useFavoritas()
  const poster = imagen(pelicula.poster_path)

  return (
    <article className="group relative">
      <Link to={`/peliculas/${pelicula.id}`} className="block">
        <div className="aspect-2/3 overflow-hidden rounded-xl bg-card ring-1 ring-border transition group-hover:ring-primary/60">
          {/* Ternario en JSX: imagen si hay póster, ícono si no */}
          {poster ? (
            <img
              src={poster}
              alt={`Póster de ${pelicula.title}`}
              loading="lazy"
              className="size-full object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="grid size-full place-items-center text-muted-foreground">
              <Film className="size-12" />
            </div>
          )}
        </div>
        <h3 className="mt-3 line-clamp-1 font-semibold" title={pelicula.title}>
          {pelicula.title}
        </h3>
        <div className="mt-1 flex items-center justify-between text-sm text-muted-foreground">
          <span>{anio(pelicula.release_date)}</span>
          {/* && : si no hay votos, no se pinta nada */}
          {pelicula.vote_average > 0 && <Calificacion valor={pelicula.vote_average} />}
        </div>
      </Link>

      {/* M1: onAlternar recibe una FUNCIÓN. () => alternar(pelicula), nunca alternar(pelicula) a secas */}
      <BotonFavorito activo={esFavorita(pelicula.id)} onAlternar={() => alternar(pelicula)} className="absolute top-2 right-2" />
    </article>
  )
}
