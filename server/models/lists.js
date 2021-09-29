const model = (sequelize, DataTypes) => {
    const lists = sequelize.define('lists', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    },
    {
    timestamps: false,
    createdAt: false,
    updatedAt: false
    });
    return lists;
};

module.exports=model;
