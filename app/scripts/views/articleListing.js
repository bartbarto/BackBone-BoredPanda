/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/articleView'
], function($, _, Backbone, JST, ArticleView) {
    'use strict';

    var ArticleListing = Backbone.View.extend({
        initialize: function() {
            this.views = [];
            this.listenTo(this.collection, 'reset', this.render, this);
            this.listenTo(this.collection, 'sort', this.render, this);
        },

        render: function() {

            // empty out the subviews
            // This enables us to have a _direct_ reference to the subviews in case we need it.
            _.each(this.views, function(view) {
                view.remove();
            });
            this.views = [];

            // render all the children
            this.collection.each(function(article) {
                var view = new ArticleView({
                    model: article
                });
                this.$el.append(view.render().el);

                // keep a reference to the view.
                // See reference we setup on l. 115
                this.views.push(view);
                console.log('viewRenderEind');
                console.log(this.views);
            }, this);

            return this;
        }

    });

    return ArticleListing;
});
