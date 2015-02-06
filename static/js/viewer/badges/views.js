(function(_, Backbone, storybase){

    if (_.isUndefined(storybase.badges.views)) {
        storybase.badges.views = {}
    }

    var Views = storybase.badges.views;

    var BadgeView = Views.BadgeView = Backbone.View.extend({
        template: _.template('<div class="badge">\
                                <img src="<%= icon_uri %>" />\
                              </div>'),
        render: function(){
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });

    var BadgesView = Views.BadgesView = Backbone.View.extend({
        initialize: function() {
            this.listenTo(this.collection, 'change add remove update', this.render, this);
        },
        render: function() {
            this.collection.each(function(m) {
                console.log(this, m);
                var badgeView = new BadgeView({model: m});
                this.$el.append(badgeView.render().el);

            }, this);

            return this;
        }
    });

}(_, Backbone, storybase));
