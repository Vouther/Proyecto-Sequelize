const {body} = require('express-validator')

module.exports = [

    //Validacion de campos e el formulario
    // Validación del campo "title"
    body('title').notEmpty().withMessage('El título es requerido'),

    // Validación del campo "rating"
    body('rating').notEmpty().withMessage('El rating es requerido')
        .isDecimal().withMessage('El rating debe ser un número decimal válido'),

    // Validación del campo "awards"
    body('awards').notEmpty().withMessage('El número de premios es requerido')
        .isInt().withMessage('El número de premios debe ser un número entero'),

    // Validación del campo "release_date"
    body('release_date').notEmpty().withMessage('La fecha de lanzamiento es requerida'),
        //.isDate().withMessage('La fecha de lanzamiento debe ser una fecha válida'),

    // Validación del campo "length"
    body('length').optional({ nullable: true }).isInt().withMessage('La duración debe ser un número entero'),

    // Validación del campo "genre_id"
    body('genre').notEmpty().withMessage('El género es requerido')
        .isInt().withMessage('Debes generar un genero')
];