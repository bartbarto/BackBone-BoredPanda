/*global define*/

define([
	'jquery',
    'backbone',
    'collections/Articles',
    'models/Article',
    'views/articleListing',
], function ($, Backbone, Articles, Article, ArticleListing) {
    'use strict';

    var ArticleRouter = Backbone.Router.extend({
    routes: {
        'search/:what': 'search',
        'articles/:title': 'articles',
        'category/:category': 'category',
        '': 'index'
    },
    index: function() {
    	var articles = new Articles();
    	articles.fetch();

    	console.log(articles);

        console.log('index page', articles.length, 'items');

        // do stuff
        var articlesView = new ArticleListing({
            collection: articles
        });

        console.log('viewie: ', articlesView);

        var artView = $('#articles').html(articlesView.render().el)
        console.log(artView);
    },

});

    return ArticleRouter;
});
