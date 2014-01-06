/*global define*/


define([
    'jquery',
    'backbone',
    'collections/Articles',
    'collections/emptyCollection',
    'models/Article',
    'views/articleListing',
], function($, Backbone, ArticlesCollection, emptyCollection, Article, ArticleListing) {
    'use strict';

    var ArticleRouter = Backbone.Router.extend({
        routes: {
            'search/:what': 'search',
            'articles/:title': 'articles',
            'category/:category': 'category',
            '': 'index'
        },
        index: function() {

            var articles = new ArticlesCollection();

            var articlesView = new ArticleListing({
                        collection: articles
                    });

                    var artView = $('#articles').html(articlesView.render().el)
                    //console.log(artView);

            // articles.fetch({
            //     success: function(items) {


            //         articles.add(items);


            //         // do stuff
            //         var articlesView = new ArticleListing({
            //             collection: articles
            //         });

            //         var artView = $('#articles').html(articlesView.render().el)
            //         //console.log(artView);
            //     }
            // });


        },
        articles: function() {

        }

    });

    return ArticleRouter;
});
