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
            'categories': 'categoriesList',
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

            articles.on('sort', function(e) {

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

            articles.on('sort', function(e) {

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
        category: function(cat) {
            console.log('categorie: ', cat);
            if (!articles) {
                var articles = new ArticlesCollection();
            };

            articles.on('sort', function(e) {

                var query_encoded = cat;

                var query = decodeURIComponent(query_encoded.replace(/\+/g, "%20"));

                var foundCollection = new emptyCollection();

                console.log(articles);

                for (var i = 0; i < articles.length; i++) {
                    for (var j = 0; j < articles.models[i].attributes.categories.length; j++) {

                        if (articles.models[i].attributes.categories[j] == cat) {
                            console.log(articles.models[i].attributes.categories[j], '->', j);
                            foundCollection.add(articles.models[i])
                        };
                    };
                };


                var searchView = new ArticleListing({
                    collection: foundCollection
                });

                $('#articles').html(searchView.render().el);
                $('body').scrollTop(0);
            })
        },
        categoriesList: function() {

            console.warn('categories listing initialzing');

            var articles = new ArticlesCollection();
            var categoryArray = new Array();

            articles.on('sort', function() {

                for (var i = 0; i < articles.models.length; i++) {

                    for (var j = 0; j < articles.models[i].attributes.categories.length; j++) {

                        if (!inArray(articles.models[i].attributes.categories[j], categoryArray)) {
                            categoryArray.push(articles.models[i].attributes.categories[j])
                        };
                    };

                };

                // var categoriesFilled = new emptyCollection(); //om er een collectie van te maken
                // categoriesFilled.add(categoryArray);			 //hier ook


                // $('#articles').html(categoryView.render().el);
                $('#articles').html(formPrettyString(categoryArray));
                $('body').scrollTop(0);


            })

            function inArray(needle, haystack) {
                var length = haystack.length;
                for (var i = 0; i < length; i++) {
                    if (haystack[i] == needle) return true;
                }
                return false;
            }

            function formPrettyString(array){
            	var returnStr ='';
            	returnStr += '<div class="row">';
            	for (var i = 0; i < array.length; i++) {
            		returnStr += '<div class="col-sm-3" style="margin-bottom:10px;">'
            		returnStr += '<a class="btn btn-primary btn-sm" style="width:95%;" href="#category/';
            		returnStr += array[i];
            		returnStr += '">';
            		returnStr += array[i];
            		returnStr += '</a></div>';
            	};
            	returnStr += '</div>'
            	return returnStr;
            }

        },

    });

    return ArticleRouter;
});
