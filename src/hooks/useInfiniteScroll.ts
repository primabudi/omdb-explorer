import { useEffect } from 'react'
import useIntersectionObserver from './useIntersectionObserver'

interface UseInfiniteScrollOptions {
  loading: boolean
  hasMore: boolean
  onLoadMore: () => void
}

function useInfiniteScroll({ loading, hasMore, onLoadMore }: UseInfiniteScrollOptions) {
  const { targetRef, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
  })

  useEffect(() => {
    if (isIntersecting && !loading && hasMore) {
      onLoadMore()
    }
  }, [isIntersecting, loading, hasMore, onLoadMore])

  return { targetRef }
}

export default useInfiniteScroll
