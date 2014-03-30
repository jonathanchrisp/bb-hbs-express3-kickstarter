'use strict';

require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    bootstrap: {
      deps: ['jquery'],
      exports: 'Bootstrap'
    },
    handlebars: {
      exports: 'Handlebars'
    }
  },
  paths: {
    jquery: '../vendor/jquery/dist/jquery',
    backbone: '../vendor/backbone/backbone',
    underscore: '../vendor/underscore/underscore',
    bootstrap: '../vendor/bootstrap/dist/js/bootstrap',
    handlebars: '../vendor/handlebars/handlebars',
    text:  '../vendor/requirejs-text/text'
  }
});

require([
  'backbone',
  'routers/router'
], function (Backbone, AppRouter) {
  new AppRouter();
  Backbone.history.start({ pushState: true});
});
