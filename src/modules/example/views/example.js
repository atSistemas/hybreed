import Template from './example.html'

export default Marionette.ItemView.extend({

    template: _.template(Template),

    ui: {
        input: 'input'
    },

    onShow: function() {
        this.ui.input.ionRangeSlider();
    },

    className: 'example'
});