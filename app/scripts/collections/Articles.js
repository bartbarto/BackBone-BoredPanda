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
            this.fetch({
                success: function(items) {
                    if (items.length > 0) {
                        console.log('Er zitten ' + items.length + ' items in de database');
                    } else {
                        console.log('Er zijn geen items gevonden in de database');
                    }
                }
            });
        },
    });

    return ArticlesCollection;
});
