const express = require('express');
const Article = require('./../models/article');
const router = express.Router();

// route to new blog
router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
});

// EDIT route
router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article })
});

// Slugify the URL to look prettier
router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({slug: req.params.slug});
    if (article == null) res.redirect('/')
    res.render('articles/show', { article: article });
});

// saves article to database
router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'));

// PUT route
router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'));

// Delete route
router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
});


// Save Article and Redirect
function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title,
        article.description = req.body.description,
        article.markdown = req.body.markdown
        try {
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        } catch (e) {
            res.render(`articles/${path}`, { article: article });
            console.log (e);
        }
    }
}

// tell the application to use the router
module.exports = router;