/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
], function($, _, Backbone, JST) {
    'use strict';

    var ArticleView = Backbone.View.extend({
        className: 'article-view teaser col-md-12',
        tagName: 'div',
        template: JST['app/scripts/templates/articleView.ejs'],
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },
        render: function() {
            //console.log('render: ' + this.model.get('title'));

            var content = this.template(this.model.toJSON());
            this.$el.html(content);

            return this;
        }
    });

    return ArticleView;
});
