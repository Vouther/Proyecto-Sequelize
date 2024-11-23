/* ESTRUTURA DE LA TABLA
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `ranking` int(10) unsigned NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `genres_ranking_unique` (`ranking`)
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
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ranking: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true // Valor predeterminado según la lógica de negocio
        }
    }

    config = {
        tableName: 'genres',
        timestamps: false,
    }

    const Genero = sequelize.define("Genero", cols, config)

    //Definimos las relaciones
    Genero.associate = function (models) {
        
        //Relacion tiene muchas ....
        Genero.hasMany(models.Pelicula, {
            //Como llamo a la relacion
            as: "peliculas",
            //Como que atributo se relaciona
            foreignKey: "genre_id"
        })
    }

    return Genero;
}