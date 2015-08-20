
/*!
 * Module dependencies.
 */

var BadRequest = require('./error').BadRequest

/**
 * Bearer parser.
 *
 * @param {Object} opts
 * @return Middleware
 */

module.exports = function(opts) {
  opts = opts || {};

  var queryKey = opts.queryKey || 'access_token'
    , bodyKey = opts.bodyKey || 'access_token'
    , headerKey = opts.headerKey || 'Bearer'
    , reqKey = opts.reqKey || 'token';

  return function bearerParser(req, res, next) {
    Promise
      .all([
        req.query && req.query[queryKey],
        req.body && req.body[bodyKey],
        req.headers && req.headers.authorization && req.headers.authorization.match(/Bearer\s(\S+)/)
      ])
      .then(function getBearerToken(methods) {
        var methodsUsed = (methods[0] !== undefined) + (methods[1] !== undefined) + (methods[2] !== undefined);

        if (!methodsUsed)
          return undefined;

        if (methodsUsed > 1) 
          throw new BadRequest("Only one method may be used to authenticate at a time (Auth header, GET or POST).")

        // POST: http://tools.ietf.org/html/rfc6750#section-2.2
        if (methods[1] && req.method === "GET")
          throw new BadRequest("Method cannot be GET When putting the token in the body.")

        // POST: http://tools.ietf.org/html/rfc6750#section-2.2
        if (methods[1] && !req.is("application/x-www-form-urlencoded"))
          throw new BadRequest("When putting the token in the body, content type must be application/x-www-form-urlencoded.")

        // Header: http://tools.ietf.org/html/rfc6750#section-2.1
        if (req.headers.authorization && !methods[2])
          throw new BadRequest("Malformed auth header")

        return methods[0] || methods[1] || methods[2] && methods[2][1];
      })
      .then(function setBearerToken(token) {
        req.token = token;
      })
      .then(next.bind(null), next);
  };
};
