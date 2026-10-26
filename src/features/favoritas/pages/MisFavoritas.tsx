import { Heart } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { useFavoritas } from '@/core/favoritas/favoritas-context'
import { GrillaPeliculas } from '@/features/peliculas/components/GrillaPeliculas'
import { EstadoVacio } from '@/shared/components/EstadoVacio'

// La misma Grilla, ahora con datos que no vienen de la API sino del contexto de favoritas
export function MisFavoritas() {
  const { favoritas } = useFavoritas()

  return (
    <section>
      <title>Mis favoritas · Cartelera</title>
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Mis favoritas</h1>

      {favoritas.length === 0 ? (
        <EstadoVacio icono={Heart} titulo="Todavía no marcas ninguna película">
          <Button asChild variant="outline">
            <Link to="/peliculas">Ir al catálogo</Link>
          </Button>
        </EstadoVacio>
      ) : (
        <GrillaPeliculas peliculas={favoritas} />
      )}
    </section>
  )
}
