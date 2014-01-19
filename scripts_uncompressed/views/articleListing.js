/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/articleView',
    'models/Article'
], function($, _, Backbone, JST, ArticleView, Article) {
    'use strict';

    var ArticleListing = Backbone.View.extend({
        initialize: function() {
            this.views = [];
            this.listenTo(this.collection, 'sync change sort', this.render, this);
        },

        render: function() {

            this.collection.each(function(Article){
                var view =  new ArticleView({model:Article});
                this.$el.append(view.render().el);
            }, this)
            return this;
        }

    });

    return ArticleListing;
});
