const express = require('express');
const Article = require('./../models/article');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
});

router.get('/:id', (req, res) => {
    res.send(req.params.id);
});

// saves article to database
router.post('/', async (req, res) => {
    let article = new Article({
        // title: "title",
        // description: "descript",
        // markdown: "markdown", 
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    });
    try {
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
    } catch (e) {
        res.render('articles/new', { article: article });
        console.log (e);
    }
});

// tell the application to use the router
module.exports = router;