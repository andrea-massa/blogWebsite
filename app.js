const express = require('express');
const ejs = require('ejs')
const bodyParser = require('body-parser');
const app = express();

var posts = [];

//Setting up view engine and view directory
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
//Set up body-parser
app.use(bodyParser.urlencoded({extended: true}))
//Set up static content
app.use(express.static(__dirname + '/public'))


//Server listening on process.env.PORT or port 3000 depending 
//on wether code is running on local machine or heroku server
app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port 3000');
})

app.get('/', (req, res) => {
    const data = {
        posts: posts,        
        metadata: {
            pageTitle: 'Home',
            author: 'Andrea Massa'
        }        
    }
    res.render('home', {data});
})

app.post('/', (req, res) => {    
    let post = {
        title : req.body.contentTitle,
        text : req.body.contentText
    };
    posts.push(post);
    res.redirect('/');
})

app.get('/about', (req, res) => {
    const data = {
        metadata : {
            pageTitle: 'About Us',
            author: 'Andrea Massa'            
        }
    }
    res.render('about', {data});
})

app.get('/contact', (req, res) => {
    const data = {
        phoneNumber: '123-456-7891',
        email: 'exampleemail@domain.com',
        metadata : {
            pageTitle: 'Contact',
            author: 'Andrea Massa'            
        }
    }
    res.render('contact', {data})
})

app.get('/compose', (req, res) => {
    const data = {
        metadata: {
            pageTitle: 'Compose',
            author: 'Andrea Massa'
        }
    }
    res.render('compose', {data})
})

app.get('/posts/:title', (req, res) => {
    const postTitle = req.params.title;        
    posts.forEach((post) => {
        if(post.title.toLocaleLowerCase() == postTitle.toLowerCase()){
            const data = {
                post: post,
                metadata: {
                    pageTitle: `Post: ${post.title.toLocaleLowerCase()}`,
                    author: 'Andrea Massa'
                }
            }
            res.render('post', {data});
        }
    })   
})



