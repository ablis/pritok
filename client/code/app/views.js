// Defines all our views for Ember.
/*global Ember */
"use strict";

var Pritok = require('./app');

// Log in page view.
Pritok.SignInView = Ember.View.extend({
  // HTML element settings.
  classNames: [ 'sign-in-view' ],
  tagName: 'form',

  // Action callback for the sign in button.
  submit: function (event) {
    this.get('controller').send('signIn');
    event.preventDefault();
  }
});
