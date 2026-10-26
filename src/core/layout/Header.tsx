import { Clapperboard, Heart } from 'lucide-react'
import { Link, NavLink } from 'react-router'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useFavoritas } from '@/core/favoritas/favoritas-context'

// NavLink sabe si su ruta está activa: la variante del botón depende de eso
export function Header() {
  const { favoritas } = useFavoritas()

  return (
    <header className="sticky top-0 z-20 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-6 py-4">
        <Link to="/peliculas" className="flex items-center gap-3 text-left">
          <span className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Clapperboard className="size-5" />
          </span>
          <span>
            <span className="block text-xl leading-tight font-bold tracking-tight">Cartelera</span>
            <span className="block text-xs text-muted-foreground">Catálogo de películas</span>
          </span>
        </Link>

        <nav className="ml-auto flex items-center gap-1">
          <NavLink to="/peliculas">
            {({ isActive }) => <Button asChild variant={isActive ? 'secondary' : 'ghost'}><span>Películas</span></Button>}
          </NavLink>
          <NavLink to="/favoritas">
            {({ isActive }) => (
              <Button asChild variant={isActive ? 'secondary' : 'ghost'}>
                <span>
                  <Heart className="fill-primary text-primary" />
                  Favoritas
                  {favoritas.length > 0 && <Badge className="ml-1 h-5 min-w-5 px-1.5 tabular-nums">{favoritas.length}</Badge>}
                </span>
              </Button>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
