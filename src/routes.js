const { Router } = require('express');
const DevControle = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController')


const routes = Router();

routes.post('/devs',DevControle.store);
routes.get('/users', DevControle.index);
routes.put('/dev', DevControle.update);

routes.get('/searh',SearchController.index);


module.exports = routes;