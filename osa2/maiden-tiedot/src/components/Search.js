const Search = ({ search, handleSearch }) => {
    return (
        <div>
            <input value={search} onChange={handleSearch}/>
        </div>
    )
};

export default Search;