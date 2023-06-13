import { gql } from '@apollo/client';


export const QUERY_CHECKOUT = gql`
  query getCheckout(car: String) {
    checkout(car: $car) {
      session
    }
  }
`;

export const QUERY_CARS = gql`
    cars {
      _id
      make
      model
      year
      color
      mileage
      price
      image
    }
`;

export const QUERY_CAR = gql`
  query getCar($id: String) {
    car(_id: $id) {
      _id
      make
      model
      year
      color
      mileage
      price
      image
    }
  }
`;

export const QUERY_SPECIFIC_CAR = gql`
  query getCar($make: String, $model: String, $year: String, $color: String, $mileage: String, $price: String) {
    car(make: $make, model: $model, year: $year, color: $color, mileage: $mileage, price: $price) {
      _id
      make
      model
      year
      color
      mileage
      price
    }
  }
`;

export const QUERY_USER = gql`
    getUser($id: String) {
      user(_id: $id)
        firstName
        lastName
        purchases {
          purchaseDate
          cars {
            _id
            make
            model
            year
            color
            mileage
            price
            image
          }
        }
      }
`;

