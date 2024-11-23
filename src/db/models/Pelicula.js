const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        /*created_at: {
            type: DataTypes.DATE,
            allowNull: true 
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true 
        },*/
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.DECIMAL(3, 1),
            allowNull: false
        },
        awards: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        release_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        length: {
            type: DataTypes.INTEGER,
            allowNull: true 
        },
        genre_id: {
            type: DataTypes.INTEGER,
            allowNull: true 
        }
    }

    const config = {
        tableName: 'movies',
        timestamps: false,
    }

    const Pelicula = sequelize.define("Pelicula", cols, config);

   //Definimos las relaciones
   Pelicula.associate = function (models) {
    
        //Relacion pertenece a uno ....
        Pelicula.belongsTo(models.Genero, {
            //Como llamo a la relacion
            as: "genero", 
            //Como que atributo se relaciona
            foreignKey: "genre_id"
        })

        //Relacion de muchos a muchos
        Pelicula.belongsToMany(models.Actor, {
            //Como llamo a la relacion
            as: "actores",
            //Definimos la tabla intermedia
            through: "actor_movie",
            //Como que atributo se relaciona
            foreignKey: "movie_id",
            otherKey: "actor_id",
            timestamps: false
        })
    }

    return Pelicula;
}


/*
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `title` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `rating` decimal(3,1) unsigned NOT NULL,
  `awards` int(10) unsigned NOT NULL DEFAULT '0',
  `release_date` datetime NOT NULL,
  `length` int(10) unsigned DEFAULT NULL,
  `genre_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `movies_genre_id_foreign` (`genre_id`),
  CONSTRAINT `movies_genre_id_foreign` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`)
*/