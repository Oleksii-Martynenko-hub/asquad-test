import { useRef } from "react"
import { useCallback, useEffect, useState } from "react"

type UseAsyncProps = {
  url: string
  method?: "GET" | "POST"
  body?: BodyInit
  headers?: HeadersInit
  onMount?: boolean
}

export const useAsync = <D>({ url, method, body, headers, onMount = true }: UseAsyncProps) => {
  const isFirstMount = useRef(true)
  const [isPending, setIsPending] = useState(false)
  const [isResolved, setIsResolved] = useState(false)
  const [isRejected, setIsRejected] = useState(false)

  const [data, setData] = useState<D | null>(null)
  const [error, setError] = useState<unknown | null>(null)

  // useEffect(() => {
  //   if (!isPending && !isResolved && !isRejected) {
  //     setIsPending(true)
  //   }
  // }, [isPending, isResolved, isRejected])

  useEffect(() => {
    if (isFirstMount.current && onMount) {
      isFirstMount.current = false
      requestAsync({ url, method, body, headers })
    }
  }, [])

  const requestAsync = useCallback(async ({ url, method, body, headers }: UseAsyncProps) => {
    try {
      setIsPending(true)

      const res = await fetch(url, {
        method,
        body,
        headers: new Headers(headers)
      })
      const parsedRes = await res.json() as D

      setData(parsedRes)

      setIsResolved(true)
    } catch(err) {
      setError(err)

      setIsRejected(true)
    } finally {
      setIsPending(false)
    }
  }, [])

  const send = useCallback( async () => {
    await requestAsync({ url, method, body, headers })
  }, [url, method, body, headers, requestAsync])

  return { send, data, error, isPending, isResolved, isRejected }
}