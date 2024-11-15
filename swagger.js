<<<<<<< HEAD
//swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


//Configuración de Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentacion de la API', //Titulo de la Documentación
    version: '1.0.0', //Versión de la API
    description: 'Documentacion de la API con Swagger'
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1', //URL base de la API
      description: 'Servidor de Desarrollo'
    },
  ],
};
 
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'] //Ajusta esto a la ruta de los archivos de las rutas
};
 
 
const swaggerSpec = swaggerJSDoc(options);
 
function setupSwagger(app){
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
 
=======
//swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


//Configuración de Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentacion de la API', //Titulo de la Documentación
    version: '1.0.0', //Versión de la API
    description: 'Documentacion de la API con Swagger'
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1', //URL base de la API
      description: 'Servidor de Desarrollo'
    },
  ],
};
 
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'] //Ajusta esto a la ruta de los archivos de las rutas
};
 
 
const swaggerSpec = swaggerJSDoc(options);
 
function setupSwagger(app){
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
 
>>>>>>> 9a951d410bbc4da9e8ae1041d29bcb166384b753
module.exports = setupSwagger;