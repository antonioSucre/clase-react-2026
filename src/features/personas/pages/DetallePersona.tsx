import { Link, useParams } from 'react-router'
import { Skeleton } from '@/components/ui/skeleton'
import { imagen } from '@/core/config/tmdb'
import { anio } from '@/features/peliculas/models/pelicula'
import { MensajeError } from '@/shared/components/MensajeError'
import { usePersona } from '../hooks/usePersona'

const MAX_CONOCIDO_POR = 15

export function DetallePersona() {
  const { id } = useParams()
  const { datos: persona, error, reintentar } = usePersona(Number(id))

  if (error) return <MensajeError mensaje={error} onReintentar={reintentar} />
  if (!persona) return <EsqueletoPersona />

  // Dato derivado: más populares primero, sin repetidas, solo las primeras 15
  const conocidoPor = persona.movie_credits.cast
    .toSorted((a, b) => b.popularity - a.popularity)
    .filter((c, i, todas) => todas.findIndex((x) => x.id === c.id) === i)
    .slice(0, MAX_CONOCIDO_POR)

  const foto = imagen(persona.profile_path, 'w500')

  return (
    <section>
      <title>{`${persona.name} · Cartelera`}</title>

      <div className="grid gap-8 md:grid-cols-[260px_1fr]">
        {foto && <img src={foto} alt={persona.name} className="w-48 rounded-xl shadow-2xl md:w-full" />}
        <div className="min-w-0">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{persona.name}</h1>
          <p className="mt-2 text-muted-foreground">
            {persona.known_for_department}
            {persona.birthday && ` · Nació el ${persona.birthday}`}
            {persona.place_of_birth && ` en ${persona.place_of_birth}`}
          </p>
          <p className="mt-6 max-w-2xl leading-relaxed whitespace-pre-line">
            {persona.biography || 'Sin biografía en español.'}
          </p>
        </div>
      </div>

      {conocidoPor.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-3 font-semibold">Conocido por</h2>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {conocidoPor.map((c) => {
              const poster = imagen(c.poster_path, 'w342')
              return (
                <li key={c.id}>
                  <Link to={`/peliculas/${c.id}`} className="block text-sm hover:underline">
                    {poster ? (
                      <img src={poster} alt={`Póster de ${c.title}`} className="aspect-2/3 w-full rounded-lg object-cover" />
                    ) : (
                      <div className="aspect-2/3 w-full rounded-lg bg-muted" />
                    )}
                    <p className="mt-2 truncate font-medium">{c.title}</p>
                    <p className="text-xs text-muted-foreground">{anio(c.release_date)}</p>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </section>
  )
}

function EsqueletoPersona() {
  return (
    <div className="grid gap-8 md:grid-cols-[260px_1fr]" aria-busy="true" aria-label="Cargando">
      <Skeleton className="aspect-2/3 rounded-xl" />
      <div className="space-y-4">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-28 w-full" />
      </div>
    </div>
  )
}
