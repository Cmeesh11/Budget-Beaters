import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function PurchaseHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to Cars</Link>

        {user ? (
          <>
            <h2>
              Purchase History for {user.firstName} {user.lastName}
            </h2>
            {user.purchases.map((purchase) => (
              <div key={purchase._id} className="my-2">
                <h3>
                  {new Date(parseInt(purchase.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="flex-row">
                  {purchase.cars.map(({ _id, image, year, make, model, price }, index) => (
                    <div key={index} className="card px-1 py-1">
                      <Link to={`/cars/${_id}`}>
                        <img alt={`${year}' '${make}' '${model}`} src={image}/>
                        <p>{year}{' '}{make}{' '}{model}</p>
                      </Link>
                      <div>
                        <span>${price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

export default PurchaseHistory;
