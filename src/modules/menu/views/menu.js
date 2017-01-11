import {_ ,Marionette} from '~/src/vendor/libs';
import Template from './menu.html';

export default Marionette.View.extend({

    template: _.template(Template),

    className: 'menu',

    triggers: {
        'click .logout': 'logoutPressed'
    }
});
