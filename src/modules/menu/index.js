import MenuView from './views/menu'
import {Broker} from 'vendor/libs';

function getView() {

    var menuView = new MenuView();

    menuView.on({
        logoutPressed() {
            if(confirm('Are you sure you want to logout?')) {
                Broker.channel.trigger('login:logout');
            }
        }
    });

    return menuView;
}

//
// API
//

Broker.channel.reply({
    'menu:getView': getView
});

export default {
    getView
};