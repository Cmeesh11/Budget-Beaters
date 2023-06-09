import React, { useState } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (car) => {
    if (!favorites.includes(car)) {
      setFavorites([...favorites, car]);
    }
  };

  const removeFromFavorites = (car) => {
    const updatedFavorites = favorites.filter((fav) => fav !== car);
    setFavorites(updatedFavorites);
  };

  return (
    <div>
      <h1>My Budget Beaters</h1>
      {favorites.length === 0 ? (
        <p>No beaters favorited yet.</p>
      ) : (
        <ul>
          {favorites.map((car) => (
            <li key={car.id}>
              {car.make} {car.model} {car.year} {car.price} {car.color} {car.mileage} {car.image}
              <button onClick={() => removeFromFavorites(car)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <p>Go back to the <a href="/">Home Page</a>.</p>
    </div>
  );
};

export default Favorites;