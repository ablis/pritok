// Ember routes for Pritok.
/*global Ember, require, ss */
'use strict';

var Pritok = require('./app');

// The basic route map.
Pritok.Router.map(function () {
  this.route('mailbox');
  this.route('sign-in');
});

// Display a mailbox.
Pritok.MailboxRoute = Ember.Route.extend({
  model: function () {
    var model = Pritok.Mailbox.create();

    window.setTimeout(function () {
      model.getMessageIDs();
    }, 300);

    return model;
  }
});

// As soon as we can communicate with SocketStream, send the user to the
// login page if he's not authenticated yet.
ss.server.on('ready', function () {
  // Get the user session data.
  ss.rpc('auth.getSessionData', function (err, sessionData) {
    // If the user is not logged in, go to the sign in page.
    if (!sessionData) {
      Pritok.Router.router.transitionTo('sign-in');
    }
  });
});
