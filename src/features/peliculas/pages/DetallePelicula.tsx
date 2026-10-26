import { useParams } from 'react-router'
import { useFavoritas } from '@/core/favoritas/favoritas-context'
import { MensajeError } from '@/shared/components/MensajeError'
import { EsqueletoFicha, FichaPelicula } from '../components/FichaPelicula'
import { usePelicula } from '../hooks/usePeliculas'

export function DetallePelicula() {
  const { id } = useParams()
  const { datos: pelicula, error, reintentar } = usePelicula(Number(id))
  const { esFavorita, alternar } = useFavoritas()

  if (error) return <MensajeError mensaje={error} onReintentar={reintentar} />
  if (!pelicula) return <EsqueletoFicha />

  return (
    <>
      <title>{`${pelicula.title} · Cartelera`}</title>
      <FichaPelicula pelicula={pelicula} favorita={esFavorita(pelicula.id)} onFavorito={() => alternar(pelicula)} />
    </>
  )
}
