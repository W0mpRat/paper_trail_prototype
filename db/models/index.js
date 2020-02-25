'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const PaperTrail = require('sequelize-paper-trail');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Paper Trail options
const opts = {
  enableCompression: false,
  enableMigration: false,
  mysql: true,
  userModel: 'User',
  belongsToUserOptions: {
    foreignKey: 'userId'
  }
}

// Load Paper Trail
const pt = PaperTrail.init(sequelize, opts)
// Setup Revision and RevisionChange models
// pt.defineModels()

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.sync()

db.sequelize = sequelize;
db.Sequelize = Sequelize;

pt.defineModels()

db['User'].Revisions = db['User'].hasPaperTrail()

module.exports = db;
