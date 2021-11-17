'use strict';

const router = require('express').Router();
const prefix = 'logs';

const controller = require('../controllers/main.controller');

// Authenticate all routes
router.use(controller._authenticate);

router.get(`/${prefix}/`, controller.all);
router.post(`/${prefix}/`, controller._createLogSchema, controller.create);
router.get(`/${prefix}/:id`, controller.info);
router.put(`/${prefix}/:id`, controller._updateLogSchema, controller.update);
router.delete(`/${prefix}/:id`, controller.delete);

module.exports = router;
