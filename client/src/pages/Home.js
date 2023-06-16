import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CARS } from '../utils/queries';
import CarCard from '../components/CarCard';
import Login from '../components/Login';

const Home = () => {
  const { loading, error, data } = useQuery(QUERY_CARS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const cars = data?.cars || [];

  return (
    <div>
      <button className="btn btn-primary"><a href="/">Home</a></button>
      <button className="btn btn-secondary">Secondary</button>
      <button className="btn btn-tertiary">Tertiary</button>
      <Login />
      <div className="d-flex flex-wrap">
        {cars.map((car) => (
          <CarCard
            key={car._id}
            image={car.image}
            price={car.price}
            year={car.year}
            make={car.make}
            model={car.model}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
