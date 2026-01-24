import { useState, useEffect, useRef } from 'react'
import { searchMovies } from '../api/omdbApi'
import { Movie } from '../types/movie'
import useDebounce from './useDebounce'

export function useAutocomplete(initialValue: string) {
  const [inputValue, setInputValue] = useState(initialValue)
  const [suggestions, setSuggestions] = useState<Movie[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  
  const debouncedValue = useDebounce(inputValue, 300)
  // this will only true if searchbox change via user input
  const shouldFetchRef = useRef(false)

  useEffect(() => {
    if (!shouldFetchRef.current) {
      return
    }

    const fetchSuggestions = async () => {
      if (debouncedValue.trim().length < 3) {
        setSuggestions([])
        return
      }

      try {
        const result = await searchMovies(debouncedValue, 1)
        setSuggestions(result.movies.slice(0, 5))
        setShowDropdown(true)
      } catch {
        setSuggestions([])
      }
    }

    fetchSuggestions()
  }, [debouncedValue])

  const _setInputValue = (value: string, shouldFetch = true) => {
    shouldFetchRef.current = shouldFetch
    setInputValue(value)
  }

  const clearSuggestions = () => {
    setSuggestions([])
    setShowDropdown(false)
    shouldFetchRef.current = false
  }

  return {
    inputValue,
    setInputValue: _setInputValue,
    suggestions,
    showDropdown,
    setShowDropdown,
    clearSuggestions
  }
}
