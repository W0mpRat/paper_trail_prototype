const User = require('../models/user')

module.exports = {
  async up (queryInterface, Sequelize) {

   const userResults = await queryInterface.bulkInsert('Users', [{
    firstName: 'Chase',
    lastName: 'Anderson',
    email: 'chase.anderson@goenergistics.com',
    age: 30,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    firstName: 'Adam',
    lastName: 'Shepherd',
    email: 'adam.shepherd@goenergistics.com',
    age: 55,
    createdAt: new Date(),
    updatedAt: new Date()
  }])

  const users = await User.findAll()

  console.log(users)

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
