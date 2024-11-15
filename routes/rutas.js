const productRouter = require('./productRouter');
const usersRouter = require('./usersRouter');
const categoriesRouter = require('./categoriesRouter');
const brandsRouter = require('./brandsRouter');
const moviesRouter = require('./moviesRouter');

const express = require('express');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  
  // Aseguramos que todas las rutas de los routers tengan el prefijo correcto
  router.use('/products', productRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/brands', brandsRouter);
  router.use('/movies', moviesRouter);
}

module.exports = routerApi;
