const { AuthenticationError } = require('apollo-server-express');
const { User, Car, Purchase } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const resolvers = {
  Query: {
    // Retreives all card
    cars: async () => {
      return await Car.find();
    },
    // Retrieves car by Id
    car: async (parent, { _id }) => {
      return Car.findById(_id);
    },
    // Retrieves cars based on criteria for search functionality
    carsByCriteria: async (parent, { make, model, year, mileage, color }) => {
      return Car.find({ make, model, year, mileage, color });
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      } else {
        throw new AuthenticationError('Not logged in');
      }
    },
    purchase: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.findById()
      } else {
        throw new AuthenticationError('Not logged in');
      }
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const purchase = new Purchase({ car: args.car });
      const line_items = [];

      const { car }= await purchase.populate('car');

        const product = await stripe.products.create({
          name: `${car.year} ${car.make} ${car.model}`,
          image: [`${url}/images/${car.image}`]
        })
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: car.price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      
      return { token, user };
    },
    createPurchase: async (parent, args, context) => {
      if (context.user) {
        const purchase = Purchase.create({ car: args.carId });
        await User.findByIdAndUpdate(context.user._id, { $push: { purchases: purchase }});
        return purchase;
      } else {
        throw new AuthenticationError('Not logged in');
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
}

module.exports = resolvers;