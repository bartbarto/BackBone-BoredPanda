/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
], function($, _, Backbone, JST) {
    'use strict';

    var detailView = Backbone.View.extend({
        className: 'article-view full-article col-md-12',
        tagName: 'div',
        template: JST['app/scripts/templates/detailView.ejs'],
        initialize: function() {
            this.listenTo(this.model, 'change sync all', this.render);
        },
        render: function() {
        	//console.log(this);
            //console.log('render: ' + this.model.get('title'));

            var content = this.template( this.model.toJSON() );
    		this.$el.html(content);

            return this;
        }
    });

    return detailView;
});
