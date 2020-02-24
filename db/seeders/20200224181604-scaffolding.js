const { User } = require('../models')

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [{
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

  await queryInterface.bulkInsert('Posts', [
    {
      userId: users[0].id,
      body: 'User 1 Post 1 initial data',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: users[1].id,
      body: 'User 2 Post 1 initial data',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: users[0].id,
      body: 'User 1 Post 2 initial data',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})

    await queryInterface.bulkDelete('Posts', null, {})
  }
};
