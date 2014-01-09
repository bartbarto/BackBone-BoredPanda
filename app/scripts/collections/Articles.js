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
        comparator: function(item) {
            return item.get(this.sort_key); // - omdat anders van laag naar hoog is //http://stackoverflow.com/questions/5013819/reverse-sort-order-with-backbone-js
        },
        initialize: function() {
            this.sort_key = 'id';
            this.fetch({
                success: function(items, response) {
                    //fetched !!
                }
            });
        },

    });

    return ArticlesCollection;
});
