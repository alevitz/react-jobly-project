import React, {useState} from 'react';
import './Search.css';

function Search({searchFor}){
const [search, setSearch] = useState("");

const handleChange = (evt) => {
  setSearch(evt.target.value);
}

 const handleClick = () => {
     searchFor(search);
  }


return (
<div className="search mb-4">
<div className="form-inline">
<input
className="form-control" 
type="text" 
value={search} 
onChange={handleChange} 
placeholder="Enter search term...">
</input>
<button className="btn btn-primary" onClick={handleClick}>Submit</button>
</div>
</div>
)
}

export default Search;