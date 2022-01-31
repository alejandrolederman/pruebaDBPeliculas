module.exports = function (sequelize, dataTypes) {
    let alias = "genres";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tabletName:"genres",
        timestamps: false
    };

let genero = sequelize.define(alias, cols, config);

genero.associate = function(models){

    genero.hasMany(models.movies, {
        as: "peliculas",
        foreignKey: "genre_id"
    });
};

return genero;
};