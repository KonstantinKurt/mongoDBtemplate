const mongoose = require('mongoose');
const validate = require('mongoose-validator');

let alphaValidator = validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Name should contain alpha-numeric characters only',
    httpStatus: 400,
});

let nameValidator = validate({
    validator: 'isLength',
    arguments: [3, 50],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
    httpStatus: 400,
});
let emailValidator = validate({
    validator: 'matches',
    arguments: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Enter correct email',
    httpStatus: 400,
})
module.exports = {
    alphaValidator: alphaValidator,
    nameValidator: nameValidator,
    emailValidator: emailValidator,
};