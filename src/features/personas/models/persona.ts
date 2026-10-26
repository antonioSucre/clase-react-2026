// Solo los campos que usamos de GET /person/:id?append_to_response=movie_credits

export interface CreditoPelicula {
  id: number
  title: string
  character: string
  poster_path: string | null
  release_date: string
  popularity: number
}

export interface Persona {
  id: number
  name: string
  biography: string
  birthday: string | null
  place_of_birth: string | null
  profile_path: string | null
  known_for_department: string
  movie_credits: { cast: CreditoPelicula[] }
}
