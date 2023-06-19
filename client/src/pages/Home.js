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
      <div className='d-flex justify-content-around'>
        <button className="btn btn-primary"><a className="text-light" href="/">Home</a></button>
        <Login />
      </div>
      <div className="d-flex flex-wrap justify-content-between">
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
