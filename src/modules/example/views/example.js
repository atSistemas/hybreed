import {_, Marionette} from '~/src/vendor/libs';
import Template from './example.html'

export default Marionette.View.extend({

    template: _.template(Template),

    ui: {
        input: 'input'
    },

    className: 'example',

    onAttach() {
        this.ui.input.ionRangeSlider();
    }
});
