const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Car {
    _id: ID
    price: Int
    make: String
    model: String
    year: Int
    color: String
    mileage: Int
    image: String
  }

  type Checkout {
    _id: ID
  }

  type Purchase {
    _id: ID
    purchaseDate: String
    car: Car
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    purchases: [Purchase]
  }

  type CheckoutSession {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  input PurchaseInput {
    purchaseDate: String
    car: ID
  }

  type CreateUserResponse {
    token: ID
    user: User
  }

  type Query {
    cars: [Car]
    car(_id: ID): Car
    carsByCriteria(make: String, model: String, year: Int, mileage: Int, color: String): [Car]
    users: [User]
    user(_id: ID): User
    purchase(_id: ID!): Purchase
    checkout(cars: [ID]!): Checkout
  }

  type Mutation {
    createPurchase(input: PurchaseInput): Purchase
    createUser(firstName: String, lastName: String, email: String, password: String): CreateUserResponse
    login(email: String, password: String): Auth
  }
`;

module.exports = typeDefs;
