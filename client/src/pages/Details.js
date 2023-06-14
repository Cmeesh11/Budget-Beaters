import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_CARS } from '../utils/queries';

function Detail() {
  const { data } = useQuery(QUERY_CARS);
  let car;

  if (data) {
    car = data.car;
  }

  return (
    <>
      {currentCar ? (
        <div className="container my-1">
          <Link to="/">← Back to Cars</Link>

          <h2>{currentCar.year} {currentCar.make} {currentCar.model} </h2>

          <p>
            <p>Mileage: {currentCar.mileage} miles</p>
            <strong>Price:</strong>${currentCar.price}{' '}
            <button onClick={addTocurrentPurchaseItem}>Add to currentPurchaseItem</button>
            <button
              disabled={!currentPurchase.find((p) => p._id === currentCar._id)}
              onClick={removeFromcurrentPurchase}
            >
              Remove from purchase
            </button>
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
