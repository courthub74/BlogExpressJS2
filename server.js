const express = require('express');
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles');
const app = express();

// connect mongo db
mongoose.connect('mongodb+srv://mongo:ws9aNiYfRZiPK2Zy@courdevscluster.rs7vdal.mongodb.net/portfolioblog');

// Set view engine to ejs
    // the view engine converts the ejs to HTML
app.set('view engine', 'ejs');

// tell express how to access the article form in models
    // so you can do the req.body.(thing)
app.use(express.urlencoded({ extended: true }));

// route at the index
app.get('/', (req, res) => {
    const articles = [{
        title: 'Test Article',
        createdAt: new Date(),
        description: 'Test description'
    }];
    res.render('articles/index', { articles: articles });
});

// Let's tell the app to use the article router
    // and where the route will be based on (/articles) or route extension
app.use('/articles', articleRouter);

// THE MOST BASIC WAY
// app.get('/', (req, res) => {
//     res.send('Hello World')
// });


app.listen(5000);