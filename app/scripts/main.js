/*global require*/
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
            exports: 'jquery'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap'
    }
});

window.App = {};

require([
    'underscore', 'backbone', 'routes/articleRouter'
], function(_, Backbone, ArticleRouter) {

    var router = new ArticleRouter();

    Backbone.history.start();

    $(function() {
        $('ul.nav li').click(function() {
            $('ul.nav li').removeClass('active');
            $(this).addClass('active');
        });
    });

    $('#search-form').on('submit', function(e){
        e.preventDefault();

        $('ul.nav li').removeClass('active');

        var query = $('#search-text').val();

        window.location.hash = "search/"+query;
    });

    $('#sort-by').on('change', function(e){

        var optionSelected = $("option:selected", this);
        var valueSelected = this.value;
         window.location.hash = valueSelected;

    });
});
