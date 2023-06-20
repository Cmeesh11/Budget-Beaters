import React, { useReducer } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_CARS } from '../utils/queries';


import Auth from '../utils/auth';
const stripePromise = loadStripe('pk_test_TYooM;QauvdEDq54NiTphI7jx');
const reducer = function(state, action) {
  return state;
}//

function Detail() {
  const [ state, setState] = useReducer(reducer, { cart: [] })
  const { data } = useQuery(QUERY_CARS);
  const { _id } = useParams();

  function submitPurchase() {
    const productIds = [];
  
    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
      
    });// fetch using the car id store id in variable or send it to backend
  
    // getPurchase({
    //   variables: { products: productIds },
    // });
  }

  if (data) {
    car = data.car;
  }

  return (
    <>
      {car ? (
        <div className="container my-1">
          <Link to="/">← Back to Cars</Link>

          <img src={car.image} className="card-img-top w-100" alt="car" />

          <h2>{car.year} {car.make} {car.model} </h2>

          <p>
            <p>Mileage: {car.mileage} miles</p>
            <strong>Price:</strong>${car.price}{' '}
            {Auth.loggedIn() ? (
              <button onClick={submitPurchase}>Purchase</button>
            ) : (
              <span>(log in to Purchase)</span>
            )}
            
          </p>

          <img
            src={car.image}
            alt={car.name}
          />
        </div>
      ) : null}
      <currentPurchase />
    </>
  );
}

export default Detail;
