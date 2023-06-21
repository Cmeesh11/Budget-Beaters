import { gql } from '@apollo/client';

export const QUERY_CHECKOUT = gql`
  query getCheckout($car: String) {
    checkout(car: $car) {
      session
    }
  }
`;

export const QUERY_CARS = gql`
  {
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
`;

export const QUERY_CAR = gql`
  query getCar($_id: ID) {
    car(_id: $_id) {
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
  query getCarsByCriteria(
    $make: String
    $model: String
    $year: Int
    $color: String
    $mileage: Int
    $price: Int
  ) {
    carsByCriteria(
      make: $make
      model: $model
      year: $year
      color: $color
      mileage: $mileage
      price: $price
    ) {
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
  query getUser($id: String) {
    user(_id: $id) {
      _id
      firstName
      lastName
      purchases {
        _id
        purchaseDate
        car {
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
  }
`;