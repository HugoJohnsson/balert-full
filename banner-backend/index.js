const next = require('next')
const dev = process.env.NODE_DEV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler() //part of next config


nextApp.prepare().then(() => {
  const config = require('./common/config/env.config.js');
  const express = require('express');
  const bodyParser = require('body-parser');
  const path = require('path');

  const AuthorizationRouter = require('./authorization/routes.config');
  const UsersRouter = require('./users/routes.config');
  const BannersRouter = require('./banners/routes.config');
  const BannerUtilsRouter = require('./bannerUtils/routes.config');
  const PaymentsRouter = require('./payments/routes.config');

  const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')))

  app.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
      res.header('Access-Control-Expose-Headers', 'Content-Length');
      res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
      if (req.method === 'OPTIONS') {
          return res.send(200);
      } else {
          return next();
      }
  });

  app.use(bodyParser.json());
  AuthorizationRouter.routesConfig(app);
  UsersRouter.routesConfig(app);
  BannersRouter.routesConfig(app);
  BannerUtilsRouter.routesConfig(app);
  PaymentsRouter.routesConfig(app);

  app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, 'views', 'index.html'));
  })

  app.get('*', (req,res) => {
    return handle(req,res) // for all the react stuff
  })

  app.listen(config.port, function () {
      console.log('app listening at port %s', config.port);
  })
})
