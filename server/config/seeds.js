const db = require('./connection');
const carsData = require('./carsData.json');
const userData = require('./userData.json');
const purchaseData = require('./purchaseData.json');

const { Car, Purchase, User } = require('../models');

db.once('open', async () => {
    await User.deleteMany({});

    const users = await User.insertMany(userData);

    console.log('Users seeded!');

    

    await Car.deleteMany({});

    const cars = await Car.insertMany(carsData);

    console.log('Users seeded!');

    await Purchase.deleteMany({});

    const purchases = await Purchase.insertMany(purchaseData);

    console.log('Users seeded!');
    process.exit(0);
});

