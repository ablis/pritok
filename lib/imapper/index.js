// Wrapper for the IMAP module that provides a convenient API for the
// rest of our app.

var async = require('async');
var IMAP = require('imap');

module.exports = function (options) {
  var self = this;

  self.init = function () {
    // Default options for development.
    options.host = options.host;
    options.port = options.port || 993;
    options.secure = options.secure || true;

    self.imap = new IMAP(options);
    self.connected = false;

    return self;
  };

  // Try connecting to the imap server.
  self.connect = function (callback) {
    if (self.connected) {
      callback(null, true);
      return self;
    }

    self.imap.connect(function (err) {
      callback(err, !err);
    });

    return self;
  };

  // Get the message count for a mailbox.
  self.getMessageList = function (mailbox, callback) {
    self.openBox(mailbox, false, function (err, connected) {
      if (err) {
        return callback(err);
      }

      // Mailbox counts by searching.
      async.parallel({
        total: function (cb) {
          self.imap.search([ 'UNDELETED' ], function (err, results, stats) {
            cb(err, results);

            console.log(stats);
          });
        },

        unread: function (cb) {
          self.imap.search([ 'UNDELETED', 'UNSEEN' ], function (err, results) {
            cb(err, results);
          });
        },
      }, callback);
    });
  };

  self.openBox = function (name, readonly, callback) {
    self.connect(function (err, connected) {
      if (err) {
        return callback(err);
      }

      self.imap.openBox('INBOX', true, callback);
    });
  };

  return self.init();
};
