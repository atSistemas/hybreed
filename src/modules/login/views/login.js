import {_, Marionette} from '~/src/vendor/libs';
import Template from './login.html';

export default Marionette.View.extend({

    template: _.template(Template),

    className: 'login',

    ui: {
        user: '.user',
        password: '.password'
    },

    events: {
        'click button': 'loginButtonPressed'
    },

    onAttach() {

    },

    loginButtonPressed() {
        this.trigger('login',
            this.ui.user.val().trim(),
            this.ui.password.val().trim());
    }
});
