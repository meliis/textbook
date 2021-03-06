'use strict';

angular.module('textbookApp')
  .factory('Contact', function ($resource) {
      var Contact = $resource('/api/contacts/:id', {id: '@_id'}, {
        update: {
          method: 'PUT'
        }
      });
    return Contact;
  });
