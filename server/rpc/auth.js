'use strict';

var Imapper = require('../../lib/imapper');

exports.actions = function (req, res, ss) {

  // Use the built-in session middleware.
  req.use('session');

  return {

    getSessionData: function () {
      if (req.session.userId) {

        return res(null, {
          email: req.session.userId,
        });
      }

      return res(null, false);
    },

    signIn: function (email, password) {
      var imap = new Imapper({
        user: email,
        password: password
      });

      imap.connect(function (err, connected) {
        if (err) {
          console.log(err);
          res(err);
        }

        // TODO: We need a safer way to store the user's password.
        req.session.password = password;
        req.session.setUserId(email);

        return res(null, connected);
      });
    }
  };
};
