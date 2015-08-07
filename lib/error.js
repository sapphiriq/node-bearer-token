
/**
 * Err constructor
 *
 * @param {String} msg Error message
 * @inherits Error https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error
 */

function Err (msg) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.message = msg;
  this.status = 500;
};

/*!
 * Inherits from Error.
 */

Err.prototype = Object.create(Error.prototype);
Err.prototype.constructor = Error;

/*!
 * Expose Err.
 */

module.exports = exports = Err;

/*!
 * Expose subclasses.
 */

Err.BadRequest = require('./badrequest');

