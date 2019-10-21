const PaymentsController = require('./controllers/payments.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const bodyParser = require('body-parser');

exports.routesConfig = function (app) {
    app.post('/payments/:userId', [
        PaymentsController.createSubscription
    ]);
    app.post('/webhooks', bodyParser.raw({type: 'application/json'}), [
        PaymentsController.handleWebhooks
    ]);
};
