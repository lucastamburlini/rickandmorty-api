require('dotenv').config();
const { Sequelize } = require('sequelize');
const FavoriteModel = require('./models/Favorite');
const UserModel = require('./models/User');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY } = process.env;

// URL ----> postgres://DB_USER:DB_PASSWORD@DB_HOST/rickandmorty
/* const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/rickandmorty`,
   { logging: false, native: false }
); */

const sequelize = new Sequelize(
   DB_DEPLOY,
   { logging: false, native: false, dialectModule: pg }
);

FavoriteModel(sequelize)
UserModel(sequelize)

const { User, Favorite } = sequelize.models;

User.belongsToMany(Favorite, { through: "user_favorite" });
Favorite.belongsToMany(User, { through: "user_favorite" })

module.exports = {
   ...sequelize.models,
   conn: sequelize,
};
