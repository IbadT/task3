require('dotenv').config();

const express = require('express');
const app = express();


const Sentry = require('@sentry/node');
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
Sentry.init({
    dsn: process.env.DSN,
    tracesSampleRate: 1.0
})


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const routes = require('./routes/index.js');
app.use('/api', routes);


const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Hello World',
//       version: '1.0.0',
//     },
//   },
//   apis: ['./routes/index*.js'], // files containing annotations as above
// };
// const swaggerDocs = swaggerJsDoc(options);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))






const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "1.0.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  // apis: ["./routes/usersRoutes*.js"],
  apis: ["./swagger/swagger*.yaml"],
};

const specs = swaggerJsDoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    // swaggerUi.setup(specs)
    swaggerUi.setup(specs,{explorer:true}) // строка поиска
);








app.listen(parseInt(process.env.PORT), () => console.log('🚀 Server is started...'));