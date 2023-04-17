const express = require('express');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('articles/new')
});

// saves article to database
router.post('/', (req, res) => {

});

// tell the application to use the router
module.exports = router;