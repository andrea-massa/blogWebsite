const express = require('express');
const ejs = require('ejs')
const bodyParser = require('body-parser');
const app = express();

//Setting up view engine and view directory
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
//Set up body-parser
app.use(bodyParser.urlencoded({extended: true}))
//Set up static content
app.use(express.static(__dirname + '/public'))

app.listen(3000, () => {
    console.log('Server started on port 3000');
})

app.get('/', (req, res) => {
    const data = {
        blogTitle : 'Andrea\'s Blog',
        blogHeader: 'My name is Andrea Massa! Welcome to my blog!',
        metadata: {
            pageTitle: 'Home',
            author: 'Andrea Massa'
        }        
    }
    res.render('home', {data});
})