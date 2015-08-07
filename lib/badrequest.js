
/*!
 * Module dependencies.
 */

var Err = require('./error');

/**
 * BadRequest ctor
 *
 * @param {String} Message
 * @inherits Error
 * @api private
 */

function BadRequest(msg) {
  Err.call(this)
  Error.captureStackTrace(this, arguments.callee);

  this.message = msg || 'Bad Request'

  this.status = 400;
};

/*!
 * Inherits from MongooseError.
 */

BadRequest.prototype = Object.create(Err.prototype);
BadRequest.prototype.constructor = Err;

/*!
 * Module exports.
 */

module.exports = exports = BadRequest;

