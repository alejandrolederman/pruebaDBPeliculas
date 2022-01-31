const db = require("../database/models");

let peliculasController = {
  
    crear: function (req,res) {

        db.genres.findAll()
      
            .then(function(generos){
                return res.render("creacionPeliculas", {generos:generos});
            })
            .catch(function(err){
                console.log(err)
            })
    }, 

    guardado: function(req,res){
        db.movies.create({
            
            title: req.body.titulo,
            awards: req. body.premios,
            release_date: req. body.fecha_estreno,
            genre_id:req. body.genero,
            length: req. body.duracion,
            rating: req. body.rating
        });
        
        res.redirect("/peliculas");
    },

    listado: function (req, res){
        db.movies.findAll()
        .then(function(peliculas){
            res.render("listadoPeliculas", {peliculas:peliculas});
        })
        .catch(function(err){
            console.log(err)
        })
    },

    detalle: function(req, res){
        db.movies.findByPk(req.params.id,{
            include: [{association: "Genero"}, {association: "actores"}]
        })    
        .then(function(pelicula){
            res.render("detallePelicula", {pelicula:pelicula})
        })
        .catch(function(err){
            console.log(err)
        })
    },

    editar: function (req, res){

        let pedidoPelicula = db.movies.findByPk(req.params.id);
        let pedidoGeneros = db.genres.findAll()

        Promise.all([pedidoPelicula, pedidoGeneros])
        .then(function([pelicula, generos]){

            res.render("editarPelicula", {pelicula:pelicula , generos:generos})
        })
    },

    actualizar: function(req, res){
        db.movies.update({
            
            title: req.body.titulo,
            awards: req. body.premios,
            release_date: req. body.fecha_estreno,
            genre_id:req. body.genero,
            length: req. body.duracion,
            rating: req. body.rating
        }, 
        {
            where: {
                id: req.params.id
            }
        });

        res.redirect("/peliculas/"+ req.params.id);
    },

    borrar: function(req, res){
        db.movies.destroy({
            where:{
                id: req.params.id
            }
        })

        res.redirect("/peliculas");
    }
};

module.exports = peliculasController;