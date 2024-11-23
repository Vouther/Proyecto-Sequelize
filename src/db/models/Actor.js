/*
Columns:
id int UN AI PK 
created_at timestamp 
updated_at timestamp 
first_name varchar(100) 
last_name varchar(100) 
rating decimal(3,1) 
favorite_movie_id int UN
*/

const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize,DataTypes) => {

    cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.DECIMAL(3, 1),
            allowNull: false
        },
    }

    config = {
        tableName: 'actors',
        timestamps: false,
    }

    const Actor = sequelize.define("Actor", cols, config)

    //Definimos las relaciones
    Actor.associate = function (models) {
        
        //Relacion de muchos a muchos
        Actor.belongsToMany(models.Pelicula, {
            //Como llamo a la relacion
            as: "peliculas",
            //Definimos la tabla intermedia
            through: "actor_movie",
            //Como que atributo se relaciona
            foreignKey: "actor_id",
            otherKey: "movie_id",
            timestamps: false
        })
    }

    return Actor;
}

