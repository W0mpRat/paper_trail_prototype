module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Revisions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      model: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      document: {
        type: Sequelize.TEXT('medium'),
        allowNull: false
      },
      documentId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      revision: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      operation: {
        type: Sequelize.STRING(7),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Revisions');
  }
};