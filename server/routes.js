/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app, socketio) {

  // Insert routes below
  app.use('/api/fileuploads', require('./api/fileupload'));
  app.use('/api/contacts', require('./api/contact'));
  app.use('/api/schedMsgs', require('./api/schedMsg'));
  app.use('/api/conversations', require('./api/conversation'));
  app.use('/api/classrooms', require('./api/classroom'));
  app.use('/api/students', require('./api/student'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  app.use('/received/sms', require('./api/twilio')(socketio));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
