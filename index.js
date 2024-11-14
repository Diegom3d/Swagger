const express = require("express");
const routerApi = require('./routes/rutas');
const { logError, errorHandler } = require('./middlewares/errorHandler');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors'); // Importa el paquete cors
const app = express();
const port = 3000;

// Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // Versión de OpenAPI (Swagger)
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentación de la API para mi aplicación',
    },
    servers: [
      {
        url: `http://localhost:${port}/api/v1`, // URL de tu API
      },
    ],
  },
  apis: ['./routes/*.js'],  

};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors()); 

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola mi server en express");
});

app.get("/nuevaruta", (req, res) => {
  res.send("hola soy una nueva ruta");
});

routerApi(app);  // Rutas de tu API

app.use(logError);
app.use(errorHandler);

app.listen(port, () => {
  console.log("El puerto esta corriendo en " + port);
});
