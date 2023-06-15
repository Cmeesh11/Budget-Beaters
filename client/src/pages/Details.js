import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_CARS } from '../utils/queries';
import { QUERY_CHECKOUT } from '../utils/queries';
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

function submitPurchase() {
  const productIds = [];

  state.cart.forEach((item) => {
    for (let i = 0; i < item.purchaseQuantity; i++) {
      productIds.push(item._id);
    }
  });

  getPurchase({
    variables: { products: productIds },
  });
}
function Detail() {
  const { data } = useQuery(QUERY_CARS);
  let car;

  if (data) {
    car = data.car;
  }

  return (
    <>
      {car ? (
        <div className="container my-1">
          <Link to="/">← Back to Cars</Link>

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
            src={`/images/${currentCar.image}`}
            alt={currentCar.name}
          />
        </div>
      ) : null}
      <currentPurchase />
    </>
  );
}

export default Detail;
