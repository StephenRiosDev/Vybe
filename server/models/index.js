const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(`postgres://postgres:admin@localhost:5432/vybe`, {dialect: 'postgres'});

sequelize.authenticate()
    .then(() => {})
    .catch( () => console.log('Error connecting to database'));

const db = {
    Sequalize: sequelize,
    sequelize: sequelize,
    users: require('./user')(sequelize, DataTypes)
}

module.exports = db;