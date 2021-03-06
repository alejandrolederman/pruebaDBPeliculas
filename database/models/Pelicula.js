module.exports = function (sequelize, dataTypes) {

    let alias = "movies";

    let cols = {

        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        title: {
            type: dataTypes.STRING
        },

        awards: {
           type: dataTypes.INTEGER
        },

        rating: {
            type: dataTypes.DOUBLE
        },

        length: {
            type: dataTypes.INTEGER
        },

        genre_id: {
            type: dataTypes.INTEGER
        },

        release_date: {
            type: dataTypes.DATE
        }
    }

    let config = {
        tabletName: "movies",
        timestamps: false
    }


let Pelicula = sequelize.define(alias, cols, config);

Pelicula.associate = function(models){

    Pelicula.belongsTo(models.genres, {
        as: "Genero",
        foreignKey: "genre_id"
    });

    Pelicula.belongsToMany(models.Actor, {
        as: "actores",
        through: "actor_movie",
        foreignKey: "movie_id",
        otherKey: "actor_id",
        timestamps: false

    });
};

return Pelicula;
};