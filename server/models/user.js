module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        user_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        date_created: DataTypes.DATE,
        date_modified: DataTypes.DATE
    }, {
        tableName: 'users',
        timestamps: false
    });

    return User;
}