const express = require('express');
const ejs = require('ejs')
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.listen(3000, () => {
    console.log('Server started on port 3000');
})

app.get('/', (req, res) => {
    res.render('home');
})