'use strinct';

const Joi = require('joi');
const Log = require('../models/Log');

class MainController {

  _authenticate(req, res, next) {
    const njwt = require('njwt');

    const signingkey = process.env.APP_KEY.toString('base64');

    // Assume Bearer authentication
    const token = req.headers.authorization.replace(/^Bearer /g, '');

    njwt.verify(token, signingkey, (err, verifiedToken) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        next();
      }
    });
  }

  static _validateRequest = (req, next, schema) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      next(
        `Validation error: ${error.details.map((err) => err.message).join(', ')}`
      );
    } else {
      req.body = value;
      next();
    }
  }

  all(req, res, next) {
    Log.find()
      .then((response) => res.json(response))
      .catch(next);
  }

  _createLogSchema(req, res, next) {
    const schema = Joi.object({
      type: Joi.string()
        .pattern(/(?:error|info|warning)/)
        .required(),
      priority: Joi.string()
        .pattern(/(?:lowest|low|medium|high|highest)/)
        .required(),
      path: Joi.string().required(),
      message: Joi.string().required(),
      request: Joi.object({
        data: Joi.any().required(),
      }).required(),
      response: Joi.object({
        data: Joi.any().required(),
      }).required(),
    });
    MainController._validateRequest(req, next, schema);
  }

  create(req, res, next) {
    Log.create(req.body)
      .then((response) => res.json(response))
      .catch(next);
  }

  info(req, res, next) {
    Log.findOne({ _id: req.params.id })
      .then((response) => res.json(response))
      .catch(next);
  }

  _updateLogSchema(req, res, next) {
    const schema = Joi.object({
      type: Joi.string()
        .pattern(/(?:error|info|warning)/)
        .empty(''),
      priority: Joi.string()
        .pattern(/(?:lowest|low|medium|high|highest)/)
        .empty(''),
      path: Joi.string().empty(''),
      message: Joi.string().empty(''),
      request: Joi.object({
        data: Joi.any(),
      }).empty(''),
      response: Joi.object({
        data: Joi.any(),
      }).empty(''),
    });
    MainController._validateRequest(req, next, schema);
  }

  update(req, res, next) {
    Log.updateOne({ _id: req.params.id }, req.body)
      .then((response) => res.json(response))
      .catch(next);
  }

  delete(req, res, next) {
    Log.deleteOne({ _id: req.params.id })
      .then((response) => res.json(response))
      .catch(next);
  }
}

module.exports = new MainController();
