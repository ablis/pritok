// IMAP wrapping library.
'use strict';

var Imapper = require('../../lib/imapper');

exports.actions = function (req, res, ss) {

  // Use the built-in session middleware.
  req.use('session');

  return {

    getMessageList: function (mailbox) {
      if (req.session.userId && req.session.password) {
        var imap = new Imapper({
          user: req.session.userId,
          password: req.session.password
        });

        imap.getMessageList(mailbox, function (err, results) {
          return res(err, results);
        });
      }
      else {
        return res('Not authenticated');
      }
    }
  };
};
