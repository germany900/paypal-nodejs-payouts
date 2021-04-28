const express = require('express');
const app = express();

app.use(require('./Pay_controller'));
app.use(require('./Payouts_controller'));
app.use(require('./webhook'));
app.use(require('./facebook_controller'));
app.use(require('./shipping_controller'));

module.exports = app;