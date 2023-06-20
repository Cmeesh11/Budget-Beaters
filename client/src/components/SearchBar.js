import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CARS } from '../utils/queries';
import CarCard from './CarCard';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCars, { loading, data }] = useLazyQuery(QUERY_CARS);
  const [filteredCars, setFilteredCars] = useState([]);


  const cardStyle = {
    height: '425px',
    border: '1px solid #4545',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px 8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  };
  

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = () => {
    searchCars({
      variables: { searchTerm },
    });
  };

  const handleCarRender = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (!data || !data.cars || data.cars.length === 0) {
      // No search term provided, render all cars
      return (
        <div>
          <h2>All Cars:</h2>
          <ul>
            {filteredCars.map((car) => (
              <div key={car._id} className="card-container" style={cardStyle}>
                <CarCard
                  key={car._id}
                  image={car.image}
                  price={car.price}
                  year={car.year}
                  make={car.make}
                  model={car.model}
                />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Link to={`/car/${car._id}`}>
                    <button className="btn btn-success">View Details</button>
                  </Link>
                </div>
              </div>
            ))}
          </ul>
        </div>
      );
    }

    const searchTermLower = searchTerm.toLowerCase();
    const filteredResults = data.cars.filter((car) => {
      for (let key in car) {
        if (
          car.hasOwnProperty(key) &&
          car[key] &&
          car[key].toString().toLowerCase().includes(searchTermLower)
        ) {
          return true;
        }
      }
      return false;
    });

    if (filteredResults.length === 0) {
      return <p>No cars match the search term.</p>;
    }

    return (
      <div>

        <div className="d-flex flex-wrap justify-content-center">
          {filteredResults.map((car) => (
            <div key={car._id} className="card-container" style={cardStyle}>
              <CarCard
                key={car._id}
                image={car.image}
                price={car.price}
                year={car.year}
                make={car.make}
                model={car.model}
              />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Link to={`/car/${car._id}`}>
                  <button className="btn btn-success">View Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  return (
    <div className="d-flex flex-wrap justify-content-center flex-column align-items-center">
      <input
        type="text"
        placeholder="Look for beaters here!"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <h2>Search Results:</h2>
      {handleCarRender()}
    </div>
  );
};

export default SearchBar;
