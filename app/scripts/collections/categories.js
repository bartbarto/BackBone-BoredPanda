/*global define*/

define([
    'underscore',
    'backbone',
    'collections/Articles',
    'collections/emptyCollection'
], function(_, Backbone, articlesCollection, emptyCollection) {
    'use strict';

    var CategoriesCollection = Backbone.Collection.extend({
        initialize: function() {
            var articles = new articlesCollection();
            var categoryArray = new Array();

            articles.on('sort', function() {

                for (var i = 0; i < articles.models.length; i++) {

                    for (var j = 0; j < articles.models[i].attributes.categories.length; j++) {

                        if (!inArray(articles.models[i].attributes.categories[j], categoryArray)) {
                            categoryArray.push(articles.models[i].attributes.categories[j])
                        };
                    };

                };

                var categoriesFilled = new emptyCollection();
                categoriesFilled.add(categoryArray);

                return categoriesFilled;
            })

            function inArray(needle, haystack) {
                var length = haystack.length;
                for (var i = 0; i < length; i++) {
                    if (haystack[i] == needle) return true;
                }
                return false;
            }


        },
    });

    return CategoriesCollection;
});
