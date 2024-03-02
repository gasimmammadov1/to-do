const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    response.render('layout/layout', { pageTitle: 'Welcome', template: 'done' });
});

module.exports = router;
