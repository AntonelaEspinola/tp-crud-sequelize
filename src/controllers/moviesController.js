const { validationResult } = require('express-validator');

const db = require('../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        db.Genre.findAll()
        .then((genres) =>{
            res.render('moviesAdd', {
                genres
            });
        })
        .catch((error) => {
            console.log(error)
        })
    },
    create: function (req, res) {
         db.Movie.create({
           ...req.body
       })
       .then((response) =>{
           console.log(response);
           res.redirect('/movies')
       })
       .catch((error) => {
           console.log(error)
       })
    },
    edit: function(req, res) {
        db.Movie.findByPk(req.params.id)
        .then((Movie) => {
            res.render('moviesEdit', {
                Movie
            })
        })
        .catch((error) =>{
            console.log(error)
        })
    },
    update: function (req,res) {
        db.Movie.update({
            ...req.body
        },
       { where : {
            id: req.params.id
        }})
        .then((Movie) => {
            res.redirect('/movies')
        })
        .catch((error) => {
            console.log(error)
        })
    },
    delete: function (req, res) {
        db.Movie.findByPk(req.params.id)
        .then((Movie) => {
            res.render('moviesDelete', {
                Movie
            })
        })
        .catch((error) =>{
            console.log(error)
        })
    },
    destroy: function (req, res) {
        db.Movie.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            console.log(result);
            res.redirect('/movies')
        })

}
}
module.exports = moviesController;