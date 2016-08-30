import Template from './example.html'

export default Marionette.View.extend({

    template: _.template(Template),

    ui: {
        input: 'input'
    },

    onAttach: function() {
        this.ui.input.ionRangeSlider();
    },

    className: 'example'
});