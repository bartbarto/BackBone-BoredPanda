/*global define*/

define([
    'underscore',
    'backbone',
], function(_, Backbone) {
    'use strict';

    var emptyCollection = Backbone.Collection.extend({
    });

    return emptyCollection;
});
