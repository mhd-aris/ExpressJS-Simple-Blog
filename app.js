const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Blog = require('./models/blog');

const app = express();

const dbURL = 'mongodb+srv://cakdol:Kontoy123@lth-mongodb.5q13r.mongodb.net/lth-mongodb?retryWrites=true&w=majority'
mongoose.connect(dbURL,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>app.listen(3000,()=>{
        console.log('Server running...')
    }))
    .catch((err) => console.log(err));
    
    
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});




app.get('/',(req, res) => {
    res.redirect('/blogs');
});

// app.get('/add-blog',(req,res)=>{
//     const blog = new Blog({
//         title: 'New Blog 2',
//         author: 'Admin 2',
//         content: 'Test'
//     });

//     blog.save()
//         .then((result)=>{
//             res.send(result)
//         })
//         .catch((err)=>{
//             console.log(err);
//         })
// });


app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt: -1})
        .then((result)=>{
            res.render('index',{title: 'All Blogs',blogs: result});
        })
        .catch((err)=>{
            console.log(err);
        });
});


// Add blog

app.get('/create',(req,res)=>{
    res.render('create');
});

app.post('/blogs',(req,res)=>{
    const blog = new Blog(req.body);

    blog.save()
        .then((result)=>{
            res.redirect('/blogs')
        })
        .catch((err)=>{
            console.log(err);
        })
});



app.get('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
        .then((result)=>{
            console.log(result);
        })
        .catch((err)=>{
            console.log(err);
        });
});

