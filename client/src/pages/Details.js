import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import currentPurchase from '../components/currentPurchase';
import {
  REMOVE_FROM_CURRENT_PURCHASE,
  UPDATE_CURRENT_PURCHASE_QUANTITY,
  ADD_TO_CURRENT_PURCHASE,
  UPDATE_CARS,
} from '../utils/actions';
import { QUERY_CARS } from '../utils/queries';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentCar, setCurrentCar] = useState({});

  const { loading, data } = useQuery(QUERY_CARS);

  const { cars } = state;

  useEffect(() => {
    // already in global store
    if (cars.length) {
      setCurrentCar(cars.find((car) => car._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_CARS,
        cars: data.cars,
      });

      data.cars.forEach((car) => {
        idbPromise('cars', 'put', car);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('cars', 'get').then((indexedCars) => {
        dispatch({
          type: UPDATE_CARS,
          cars: indexedCars,
        });
      });
    }
  }, [cars, data, loading, dispatch, id]);

  const addToCurrentPurchase = () => {
    const itemInCurrentPurchase = currentPurchase.find((currentPurchaseItem) => currentPurchaseItem._id === id);
    if (itemInCurrentPurchase) {
      dispatch({
        type: UPDATE_CURRENT_PURCHASE_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCurrentPurchase.purchaseQuantity) + 1,
      });
      idbPromise('currentPurchase', 'put', {
        ...itemInCurrentPurchase,
        purchaseQuantity: parseInt(itemIncurrentPurchase.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CURRENT_PURCHASE,
        product: { ...currentCar, purchaseQuantity: 1 },
      });
      idbPromise('currentPurchase', 'put', { ...currentCar, purchaseQuantity: 1 });
    }
  };

  const removeFromcurrentPurchase = () => {
    dispatch({
      type: REMOVE_FROM_CURRENT_PURCHASE,
      _id: currentCar._id,
    });

    idbPromise('currentPurchase', 'delete', { ...currentCar });
  };

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
