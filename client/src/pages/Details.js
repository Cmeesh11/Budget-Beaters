import React, { useReducer } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_CAR } from '../utils/queries';
import { QUERY_CHECKOUT } from '../utils/queries';
import Auth from '../utils/auth';
import mongoose from 'mongoose';
import CarCard from '../components/CarCard';

const stripePromise = loadStripe('sk_test_51NGp5jGJNy4J14jucHkzsx1hUonPIiQYD6m1PNJ2nS5iXCQfddeNbMTLJFlpQ9x9QWLxTrggy5Agkf7Z1xF3zWwJ006fPh80Lp');

function Details() {
  const { _id } = useParams();
  const { loading, data } = useQuery(QUERY_CAR, {
    variables: { _id }
  });
  
  const car = data?.car;

  console.log(data);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='d-flex justify-content-center'>
      <div>
          <CarCard
            key={car._id}
            image={car.image}
            price={car.price}
            year={car.year}
            make={car.make}
            model={car.model}
          />
          <button className='btn btn-success'><a className="text-white" href='#'>Purchase</a></button>
      </div>
    </div>
  );
}

export default Details;
