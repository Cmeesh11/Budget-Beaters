const db = require('./connection');
const carsData = require('./car.json');
const userData = require('./user.json');


const { Car, User } = require('../models');

db.once('open', async () => {
    await User.deleteMany({});

    const users = await User.insertMany(userData);

    console.log('Users seeded!');



    await Car.deleteMany({});

    const cars = await Car.insertMany(carsData);

    console.log('Cars seeded!');
});

