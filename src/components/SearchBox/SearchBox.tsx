import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setSearchQuery } from '../../features/movies/moviesSlice'
import { Movie } from '../../types/movie'
import { useAutocomplete } from '../../hooks/useAutocomplete'
import s from './SearchBox.module.css'

function SearchBox() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const searchQuery = useAppSelector((state) => state.movies.searchQuery)
  
  const {
    inputValue,
    setInputValue,
    suggestions,
    showDropdown,
    setShowDropdown,
    clearSuggestions
  } = useAutocomplete(searchQuery)

  const containerRef = useRef<HTMLDivElement>(null)
  
  // handle click outside of searchbox (hide dropdown)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setShowDropdown])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value, true)
  }

  const handleSearch = () => {
    if (!inputValue.trim()) return
    if (inputValue === searchQuery) return
    
    clearSuggestions()
    dispatch(setSearchQuery(inputValue))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleSelectSuggestion = (movie: Movie) => {
    clearSuggestions()
    navigate(`/movie/${movie.imdbID}`)
  }

  return (
    <div className={s.container} ref={containerRef}>
      <div className={s.inputWrapper}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) setShowDropdown(true)
          }}
          placeholder="Search movies..."
          className={s.input}
        />
        <button onClick={handleSearch} className={s.searchButton}>
          Search
        </button>
      </div>

      {showDropdown && suggestions.length > 0 && (
        <div className={s.dropdown}>
          {suggestions.map((movie) => {
             const hasPoster = movie.Poster && movie.Poster !== 'N/A'
             return (
              <div
                key={movie.imdbID}
                className={s.suggestion}
                onClick={() => handleSelectSuggestion(movie)}
              >
                <img 
                  src={hasPoster ? movie.Poster : '/placeholder.svg'} 
                  alt={movie.Title} 
                  className={s.poster}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement
                    img.src = '/placeholder.svg'
                  }}
                />
                <div className={s.info}>
                  <p className={s.title}>{movie.Title}</p>
                  <span className={s.meta}>{movie.Year} - {movie.Type}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SearchBox

