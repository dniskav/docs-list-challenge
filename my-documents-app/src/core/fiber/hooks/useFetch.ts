import { useEffect, useState } from '.'

export function useFetch<T>(url: string, options: RequestInit = {}) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(url, options)
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
        const result = await response.json()
        if (isMounted) {
          setData(result)
          setError(null)
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [url])

  return { data, loading, error }
}
