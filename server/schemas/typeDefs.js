const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Car {
    _id: ID
    name: String
    make: String
    model: String
    year: Int
    color: String
    mileage: Int
    image: String
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

  input UserInput {
    firstName: String
    lastName: String
    email: String
  }

  type Query {
    cars: [Car]
    car(_id: ID): Car
    users: [User]
    user(_id: ID): User
    purchase(_id: ID!) Purchase
    checkout(cars: [ID]!): Checkout
  }

  type Mutation {
    createPurchase(input: PurchaseInput): Purchase
    deletePurchase(_id: ID): Purchase
    createUser(input: UserInput): User
`;

module.exports = typeDefs;
