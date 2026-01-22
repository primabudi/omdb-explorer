import SearchBox from '../../components/SearchBox/SearchBox'
import MovieList from '../../components/MovieList/MovieList'
import { Movie } from '../../types/movie'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import useFetchMovies from '../../hooks/useFetchMovies'

function Home() {
  const { movies, searchQuery, loading, error, hasMoreMovies, loadMore } = useFetchMovies()

  const { targetRef } = useInfiniteScroll({
    loading,
    hasMore: hasMoreMovies,
    onLoadMore: loadMore,
  })

  const handlePosterClick = (movie: Movie) => {
    // TODO: show modal 
    console.log('Poster clicked:', movie.Title)
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
    </div>
  )
}

export default Home
