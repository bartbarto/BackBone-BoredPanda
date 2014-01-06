/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var ArticleModel = Backbone.Model.extend({
    defaults: {
        title: 'Article Title',
        author: 'Article Author',
        link: '#',
        publishedDate: 'today',
        contentSnippet: 'Bacon ipsum dolor sit amet beef shoulder frankfurter brisket short...',
        content: 'Lorem Bacon ipsum dolor sit amet beef shoulder frankfurter brisket short loin. Capicola shankle pork belly, turducken chuck doner leberkas short loin. Boudin strip steak pork loin shankle flank spare ribs shoulder. Ball tip leberkas beef shank jerky beef ribs tongue capicola short loin pork belly filet mignon ribeye pork doner.',
        comments: 0
    },
    initialize: function(e) {

        // make title
        var files = this.get('files');

        for (var file in files) {
            // @todo: should be optimized
            // only run once for a start
            // I just want _some_ file of the data source to be the title
            this.set('title', file);
        }

    }
});

    return ArticleModel;
});
