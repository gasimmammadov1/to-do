const express = require('express');
const doneRouter = require('./done');

const router = express.Router();

let tasks = [];

router.get('/', (request, response) => {
    response.render('layout/layout', { pageTitle: 'Welcome', template: 'index', tasks });
});

router.post('/', (request, response) => {
    const task = request.body.task;

    if (task.trim() === '') {
        response.render('layout/layout', { pageTitle: 'Welcome', template: 'index', error: true, tasks });
        return;
    }

    
    tasks.push(task); // push yerine unshift yazanda yeni task uste kecirdi ama refreshden sora. index.ejs'de apend yerine prepend yazdim duzeldi buna ehtiyac qalmadi unshift yazmaga ama yazsam da indi hecne deyismezdi
    


    response.render('layout/layout', { pageTitle: 'Welcome', template: 'index', tasks });
});

router.use('/done', doneRouter);

module.exports = router;
