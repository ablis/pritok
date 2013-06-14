// This file automatically gets called first by SocketStream and must always exist
/*global Ember, require, ss */
'use strict';

// Require the main Ember app.
window.Pritok = require('./app');

// Make 'ss' available to all modules and the browser console
window.ss = require('socketstream');

// Load the rest of the app.
require('./controllers');
require('./models');
require('./routes');
require('./views');

ss.server.on('disconnect', function(){
  console.log('Connection down :-(');
});

ss.server.on('reconnect', function(){
  console.log('Connection back up :-)');
});
