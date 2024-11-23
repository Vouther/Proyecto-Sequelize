const db = require('../db/models/index');
const {validationResult} = require('express-validator')

module.exports = {
    /*list: (req, res) => {
        db.Pelicula.findAll()
        .then(
            result => {res.render('moviesList', {movies:result});}
        )
        .catch(error => console.log(error))
    },*/
    list: async (req, res) => {
        try {
            let Peliculas = await db.Pelicula.findAll()
            res.render('moviesList', {movies:Peliculas});

        }catch(error){
            console.log(error)
        }
    },

    detail: (req, res) => {

        //Como no trea las relaciones por defecto las incluimos
        db.Pelicula.findByPk(req.params.id, {
            include:[{association: "genero"},{association: "actores"}]
        })
        .then(
            result => {res.render('moviesDetail', {movie:result})}
        )
        .catch(error => console.log(error))
    },

    new: (req, res) => {
        db.Pelicula.findAll(
            {
                order: [['release_date','ASC']]
            }
        )
        .then(
            result => {res.render('newestMovies', {movies:result})},
        )
        .catch(error => console.log(error))
    },

    recomended: (req, res) => {
        db.Pelicula.findAll(
            {
                order: [['rating','DESC']],
                limit: 5
            }
        )
        .then(
            result => {res.render('recommendedMovies', {movies:result})},
        )
        .catch(error => console.log(error))
    },
    
    //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {

        //Treamos los generos
        db.Genero.findAll()
        .then(function(generos){
            return res.render('moviesAdd',{generos})
        })
    },

    create: function (req, res) {

        //console.log(req.body);

        let result = validationResult(req);

        if(result.isEmpty()){
            db.Pelicula.create({
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre
           })
    
           res.redirect('/movies')
        } else {

            //Treamos los generos
            db.Genero.findAll()
            .then(function(generos){
                return res.render('moviesAdd',{
                    generos,
                    old: req.body,
                    error: result.mapped()
                })
            })
        }
       
    },

    edit: function(req, res) {

        let movie = db.Pelicula.findByPk(req.params.id)
        let listGenres = db.Genero.findAll()
        
        Promise.all([movie, listGenres])
        .then(
                ([movie, listGenres]) => {res.render('moviesEdit',{Movie:movie, generos:listGenres})}
            )
        .catch(error => console.log(error))
        
    },
    update: function (req,res) {
        db.Pelicula.update({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length
        },{
            where: {
                id: req.params.id
            }
        })

        res.redirect('/movies');
    },
    delete: function (req, res) {

        db.Pelicula.findByPk(req.params.id)
        .then(
            result => {res.render('moviesDelete',{Movie:result})})
        .catch(error => console.log(error))

    },

    //Destoy empleando una funcion asincrona
    destroy: async (req, res) =>{

        try{
            await db.Pelicula.destroy({
            where:{
                id : req.params.id
            }
            });
            res.redirect('/movies')
        } catch (error){
            console.log(error)
        }
    }
}

/*
UTILIZACION DE MULTIPROMESAS
multiPromesa: (req,res) => {
    const promesaClientes = db.Cliente.finsAll();
    const promesaArtistas = db.Artista.FindAll({limit:5})

    Promise.all([promesaClientes, promesaArtistas]).then(
        ([clientes, artistas]) => {
            res.json({
                clientes,
                artistas
            })
        }
    )
}

EMPLEANDO FUNCIONES ASINCRONAS
multiPromesa: async (req,res) => {
    try{
        const clientes = await db.Cliente.finsAll();
        const crtistas = await db.Artista.FindAll({limit:5})

        res.json({
            clientes,
            artistas,
        })
    }catch(error){
        console.log(error)
    }
    
}

*/