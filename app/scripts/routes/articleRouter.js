/*global define*/


define([
    'jquery',
    'backbone',
    'collections/Articles',
    'collections/emptyCollection',
    'collections/categories',
    'models/Article',
    'views/articleListing',
    'views/detailView',
], function($, Backbone, ArticlesCollection, emptyCollection, CategoriesCollection, Article, ArticleListing, detailView) {
    'use strict';

    var articles = new ArticlesCollection();

    var ArticleRouter = Backbone.Router.extend({
        routes: {
            'search/:what': 'search',
            'articles/:title': 'articlesController',
            'popular': 'popular',
            'category/:category': 'category',
            ':sort': 'sortItems',
            '': 'index'
        },
        index: function() {

            var articlesView = new ArticleListing({
                collection: articles
            });

            var artView = $('#articles').html(articlesView.render().el)


        },
        articlesController: function(id) {

            if (!articles) {
                var articles = new ArticlesCollection();
            };

            //console.log(articles);

            articles.on('sort', function(e) { //collections get automatically sorted after initialisation
                //console.log(id);

                id = parseInt(id, 10)

                var item = articles.findWhere({
                    "id": id
                });


                var articleDetailView = new detailView({
                    model: item
                });
                $('#articles').html(articleDetailView.render().el);
                $('body').scrollTop(0);

            });

        },
        popular: function() {
            if (!articles) {
                var articles = new ArticlesCollection();
            };

            articles.on('sort', function(e) { //collections get automatically sorted after initialisation

                var popular = articles.where({
                    "rating": 5
                });

                var popularCollection = new emptyCollection();
                popularCollection.add(popular);


                var popularView = new ArticleListing({
                    collection: popularCollection
                });

                $('#articles').html(popularView.render().el);
                $('body').scrollTop(0);

            });
        },
        search: function(url_query) {

            if (!articles) {
                var articles = new ArticlesCollection();
            };

            articles.on('sort', function(e) { //collections get automatically sorted after initialisation

                var query_encoded = url_query;

                var query = decodeURIComponent(query_encoded.replace(/\+/g, "%20"));

                var found = _.filter(articles.models, function(Article) {
                    var article = Article.attributes;
                    for (var id in article) {
                        if (article[id].toLowerCase != undefined) {
                            if (article[id].toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                                return true;
                            }
                        }
                    }
                    return false;
                });

                var searchCollection = new emptyCollection();
                searchCollection.add(found);


                var searchView = new ArticleListing({
                    collection: searchCollection
                });

                $('#articles').html(searchView.render().el);
                $('body').scrollTop(0);

            });
        },
        sortItems: function(field) {
            console.log('sorting by ', field);
            $('#sort-by').val(field);

            if (!articles) {
                var articles = new ArticlesCollection();
            };


            articles.on('sync', function(e) {

                articles.sort_key = field;
                articles.sort();

                var sortedView = new ArticleListing({
                    collection: articles
                });

                $('#articles').html(sortedView.render().el);
                $('body').scrollTop(0);

            })
        },
        category: function(cat){
        	var catCol = new CategoriesCollection();

        	console.log(catCol);
        }

    });

    return ArticleRouter;
});
