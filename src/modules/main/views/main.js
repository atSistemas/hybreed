import Template from './main.html'

export default Marionette.LayoutView.extend({

    template: _.template(Template),

    className: 'main',

    ui: {
        header: '.header',
        title: '.header .title'
    },

    triggers: {
        'click .header .button.back': 'backPressed'
    },

    regions: {
        header: '.header',
        content: '.content'
    },

    toggleHeader: function(visible) {
        this.ui.header.toggle(visible);    
    },
    
    toggleBackButton: function(visible) {
        this.ui.header.toggleClass('with-back-button', visible);
    },

    setTitle: function(title) {
        this.ui.title.html(title);
    }

});