const express = require('express');
const mongoose = require('mongoose');
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


//SETTING UP DATABASE
mongoose.connect('mongodb://127.0.0.1:27017/blogsite?directConnection=true')
    .then(() => {console.log('Successful connection to DB')})
    .catch((e) => {console.log('Error connecting to db\n' + e)});

//Creating models
const blogSchema = new mongoose.Schema({title: String, text: String})
const Blog = new mongoose.model('blog', blogSchema);


//Server listening on process.env.PORT or port 3000 depending 
//on wether code is running on local machine or heroku server
app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port 3000');
})

app.get('/', async (req, res) => {
    const data = {
        posts: await Blog.find({}),
        metadata: {
            pageTitle: 'Home',
            author: 'Andrea Massa'
        }        
    }
    res.render('home', {data});
})

app.post('/', async (req, res) => {    
    let newPost = {
        title : req.body.contentTitle,
        text : req.body.contentText
    };
    await new Blog(newPost).save();
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

app.get('/posts/:postid', async (req, res) => {
    const postId = req.params.postid;        
    try {        
        const data = {
            post: await Blog.findById(postId),
            metadata: {
                pageTitle: 'Post',
                author: 'Andrea Massa'
            }        
        }
        res.render('post', {data});     
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})



