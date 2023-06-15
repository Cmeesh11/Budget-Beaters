import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CARS } from '../utils/queries';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCars, { loading, data }] = useLazyQuery(QUERY_CARS);

  const handleSearch = () => {
    searchCars({
      variables: { searchTerm },
    });
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Look for beaters here!"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}

      {data && data.searchCars.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          <ul>
            {data.searchCars.map((car) => (
              <li key={car._id}>
                Make: {car.make} Model: {car.model}, Year: {car.year} Color: {car.color} Price: {car.price} Miles: {car.miles}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;