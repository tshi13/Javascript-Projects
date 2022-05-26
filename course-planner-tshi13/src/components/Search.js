import SearchBar from "material-ui-search-bar";
import PropTypes from "prop-types";


function Search(props) {
  const { query, updateQuery } = props;
  return (
    <SearchBar 
      value={query} 
      onChange={(newValue) => updateQuery(newValue)} 
      onCancelSearch={() => updateQuery("")} 
    />
  );
}

export default Search;

Search.propTypes = {
  updateQuery: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired
}