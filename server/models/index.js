const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(`postgres://postgres:admin@localhost:5432/spotit`, {dialect: 'postgres'});

sequelize.authenticate().then(() => {
        console.log('Database connected');
    })
    .catch( err => console.log(err));

const db = {
    Sequalize: sequelize,
    sequelize: sequelize,
    users: require('./user')(sequelize, DataTypes)
}

module.exports = db;