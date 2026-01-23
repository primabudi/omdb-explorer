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

  return (
    <div>
      <SearchBox />
      {searchQuery ? (
        <MovieList
          movies={movies}
          loading={loading}
          error={error}
          onPosterClick={handlePosterClick}
          loadMoreRef={targetRef}
        />
      ) : (
        <p>Start searching to find movies</p>
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

