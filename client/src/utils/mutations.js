import { gql } from '@apollo/client';


export const CREATE_USER = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const CREATE_PURCHASE = gql`
  mutation createPurchase($cars: [ID]!) {
    createPurchase(cars: $car) {
      purchaseDate
      cars {
        _id
        make
        model
        year
        color
        mileage
        price
      }
    }
  }
`;