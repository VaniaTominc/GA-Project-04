import { useHistory } from 'react-router-dom'

const SearchBar = ({ searchQuery, setSearchQuery }) => {

  const history = useHistory()

  const onSubmit = (event) => {
    event.preventDefault
    history.push(`?results=${searchQuery}`)
  }

  return (
    <form
      autoComplete="off"
      onSubmit={onSubmit}
    >

      <input
        value={searchQuery}
        onInput={(event) => setSearchQuery(event.target.value)}
        type="text"
        placeholder="Search blog posts"
        name="results"
      />

      <button type="submit">Search</button>

    </form>
  )
}

export default SearchBar