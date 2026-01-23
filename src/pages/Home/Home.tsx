import { useState } from 'react'
import SearchBox from '../../components/SearchBox/SearchBox'
import MovieList from '../../components/MovieList/MovieList'
import PosterModal from '../../components/PosterModal/PosterModal'
import { Movie } from '../../types/movie'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import useFetchMovies from '../../hooks/useFetchMovies'

function Home() {
  const { movies, searchQuery, loading, error, hasMoreMovies, loadMore } = useFetchMovies()
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { targetRef } = useInfiniteScroll({
    loading,
    hasMore: hasMoreMovies,
    onLoadMore: loadMore,
  })

  const handlePosterClick = (movie: Movie) => {
    setSelectedMovie(movie)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedMovie(null)
  }

  const showMinCharMessage = searchQuery.length > 0 && searchQuery.length < 3

  return (
    <div>
      <SearchBox />
      {!searchQuery && (
        <p>Start searching to find movies</p>
      )}
      {showMinCharMessage && (
        <p>Type at least 3 characters to search</p>
      )}
      {searchQuery.length >= 3 && (
        <MovieList
          movies={movies}
          loading={loading}
          error={error}
          onPosterClick={handlePosterClick}
          loadMoreRef={targetRef}
        />
      )}

      <PosterModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default Home

