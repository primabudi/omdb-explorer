import { useCallback, useState, useRef } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number
  root?: Element | null
  rootMargin?: string
}

function useIntersectionObserver<T extends HTMLElement>(
  options: UseIntersectionObserverOptions = {}
) {
  const { threshold = 0, root = null, rootMargin = '0px' } = options
  const [isIntersecting, setIsIntersecting] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const targetRef = useCallback(
    (node: T | null) => {
      // Disconnect previous observer
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }

      if (node) {
        observerRef.current = new IntersectionObserver(
          ([entry]) => {
            setIsIntersecting(entry.isIntersecting)
          },
          { threshold, root, rootMargin }
        )
        observerRef.current.observe(node)
      }
    },
    [threshold, root, rootMargin]
  )

  return { targetRef, isIntersecting }
}

export default useIntersectionObserver
