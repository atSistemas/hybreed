import Template from './login.html'

export default Marionette.View.extend({

    template: _.template(Template),

    ui: {
        user: '.user',
        pw: '.pw',
        remember: '.remember-checker',
        button: '.button'
    },

    triggers: {
        'click .button': 'accessButton'
    },

    onAttach: function() {
        
    },

    className: 'login'
});