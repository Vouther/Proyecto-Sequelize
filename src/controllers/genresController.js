const db = require('../db/models/index');
const sequelize = db.sequelize;


const genresController = {
    'list': (req, res) => {
        db.Genero.findAll()
            .then(genres => {
                res.render('genresList.ejs', {genres})
            })
    },
    'detail': (req, res) => {
        db.Genero.findByPk(req.params.id)
            .then(genre => {
                res.render('genresDetail.ejs', {genre});
            });
    }

}

module.exports = genresController;