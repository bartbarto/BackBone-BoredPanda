/*global define*/

define([
    'underscore',
    'backbone',
    'models/Article'
], function(_, Backbone, ArticlesModel) {
    'use strict';

    var ArticlesCollection = Backbone.Collection.extend({
        model: ArticlesModel,
        url: 'scripts/data.json',
        initialize: function() {
           this.fetch();
        },
    });

    return ArticlesCollection;
});
