require('dotenv').config();
const bodyParser = require('body-parser')
const express = require('express');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(require('./controller/Index_controller'));

app.listen('4000', () => {
    console.log('servidor corriendo en el puerto 4000');
});