import MenuView from './views/menu'
import {Broker} from '~/src/vendor/libs';

function getView() {

    var menuView = new MenuView();

    menuView.on({
        logoutPressed() {
            if(confirm('Are you sure you want to logout?')) {
                Broker.channel('login').trigger('logout');
            }
        }
    });

    return menuView;
}

//
// API
//

Broker.channel('menu').reply({
    getView
});

export default {
    getView
};
