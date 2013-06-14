// Data models for Pritok.
/*global Ember, require, ss */
'use strict';

var Pritok = require('./app');

Pritok.Mailbox = Ember.Object.extend({
  // Constructor takes the mailbox name as parameter. 
  init: function (name) {
    this.setProperties({
      // Default mailbox is the inbox.
      mailboxName: name || 'INBOX',
      dataLoaded: false,
      messageCount: null,
      unreadCount: null,
    });
  },

  // Load message IDs from server.
  getMessageIDs: function (callback) {
    var model = this;
    ss.server.on('ready', function() {
      ss.rpc('mail.getMessageList', model.get('mailboxName'), function (err, result) {
        if (!err) {
          model.setProperties({
            dataLoaded: true,
            messageCount: result.total.length,
            unreadCount: result.unread.length
          });
        }
        else {
          console.log(err);
        }
      });
    });
  }
});
