import { tmdb } from '@/core/api/tmdb'
import type { Persona } from '../models/persona'

// append_to_response: datos de la persona y sus películas en UNA sola petición
export async function obtenerPersona(id: number, signal?: AbortSignal) {
  const { data } = await tmdb.get<Persona>(`/person/${id}`, {
    params: { append_to_response: 'movie_credits' },
    signal,
  })
  return data
}
