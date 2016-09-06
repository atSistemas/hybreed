import Template from './login.html'

export default Marionette.View.extend({

    template: _.template(Template),

    className: 'login',

    ui: {
        user: '.user',
        password: '.password',
    },

    triggers: {
        'click button': 'loginPressed'
    },

    onAttach() {
        
    }
});