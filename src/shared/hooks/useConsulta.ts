import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

// Hook propio: el useEffect + AbortController de una petición, escrito UNA sola vez.
// `clave` describe QUÉ se pide (ej. "persona|287"). Si cambia, se vuelve a pedir.
export function useConsulta<T>(clave: string, consultar: (signal: AbortSignal) => Promise<T>) {
  const [datos, setDatos] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [cargando, setCargando] = useState(true)
  const [intento, setIntento] = useState(0)

  // `consultar` es una función nueva en cada render; el efecto solo debe depender de la clave
  const consultarRef = useRef(consultar)
  useEffect(() => {
    consultarRef.current = consultar
  })

  useEffect(() => {
    const control = new AbortController()

    async function cargar() {
      setCargando(true)
      setError(null)
      try {
        setDatos(await consultarRef.current(control.signal))
      } catch (e) {
        if (!axios.isCancel(e)) setError((e as Error).message)
      } finally {
        if (!control.signal.aborted) setCargando(false)
      }
    }

    cargar()

    return () => control.abort()
  }, [clave, intento])

  return { datos, error, cargando, reintentar: () => setIntento((i) => i + 1) }
}
