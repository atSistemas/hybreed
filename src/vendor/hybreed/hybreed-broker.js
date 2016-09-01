import Radio from 'backbone.marionette/node_modules/backbone.radio';

export default {

    channel: Radio.channel('main'),

    showViewInContent(view, content, preventDestroy, animationType) {
        preventDestroy = preventDestroy || false;
        this.channel.trigger('app:show:' + content, view, preventDestroy);
        if (!_.isUndefined(animationType)) {
            view.$el.one('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function () {
                $(this).removeClass('animated ' + animationType);
            }).addClass('animated ' + animationType);
        }
    },

    showViewInLayout(view, layout, preventDestroy, animationType) {
        preventDestroy = preventDestroy || false;
        layout.show(view, {preventDestroy: preventDestroy});
        if (!_.isUndefined(animationType)) {
            view.$el.one('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function () {
                $(this).removeClass('animated ' + animationType);
            }).addClass('animated ' + animationType);
        }
    }
};
