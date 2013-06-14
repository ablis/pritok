// Ember controllers for Pritok.
/*global Ember, require, ss */
'use strict';

var Pritok = require('./app');

// Controller for the base application template.
Pritok.ApplicationController = Ember.Controller.extend({
  appName: 'Pritok'
});

// Controller for the sign in view.
Pritok.SignInController = Ember.Controller.extend({
  // Form values.
  email: null,
  password: null,
  errorMessage: null,

  // Sign in action, does the actual checking.
  signIn: function () {
    var controller = this,
        login = this.get('email'),
        password = this.get('password');

    // Get the user session data.
    ss.rpc('auth.signIn', login, password, function (err, authenticated) {

      // If an error is returned, ask the user to try again.
      if (err) {
        controller.set('errorMessage', 'An error occurred, please try again.');
      }
      // If the user is not authenticated, display an error message.
      else if (!authenticated) {
        controller.set('errorMessage', 'Login failed.');
      }
      // Otherwise, clear out any old error message, and go to the front
      // page.
      else {
        controller.set('errorMessage', null);
        Pritok.Router.router.transitionTo('mailbox');
      }
    });
  }
});
