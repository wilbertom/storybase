;(function(_, Backbone, storybase) {

    if (_.isUndefined(storybase.badges.models)) {
        storybase.badges.models = {};
    }

    if (_.isUndefined(storybase.badges.collections)) {
        storybase.badges.collections = {};
    }

    var Models = storybase.badges.models,
        Collections = storybase.badges.collections,
        TastypieMixin = storybase.collections.TastypieMixin;

    var Badge = Models.Badge = Backbone.Model.extend({

    });

    Collections.Badges = Backbone.Collection.extend({
        initialize: function() {

        },
        model: Badge,
        url: '/api/0.1/badges/',

        parse: function(response) {
            return response.objects;
        }
    });

})(_, Backbone, storybase);
