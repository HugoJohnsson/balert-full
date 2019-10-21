const BannersController = require('./controllers/banners.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.get('/:userId.js', [
        BannersController.getJavaScriptFile
    ])
    app.post('/banners', [
        BannersController.insert
    ]);
    app.get('/banners/user/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        BannersController.list
    ]);
    app.get('/banners/:bannerId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        BannersController.getById
    ]);
    app.patch('/banners/:bannerId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        BannersController.patchById
    ]);
    app.delete('/banners/:bannerId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        BannersController.removeById
    ]);
};
