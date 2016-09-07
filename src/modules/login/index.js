import LoginView from './views/login'
import {Broker} from 'vendor/libs';

var loginView;

function start() {
    showExampleView();
}

function showExampleView() {

    loginView = new LoginView();

    Broker.channel.trigger('screen:start', {
        type: 'no-header',
        contentView: loginView
    });

    loginView.on({
        login(user, password) {
            console.log(`Login with ${user} ${password}`);
            Broker.channel.trigger('example:start');
        }
    });
}

//
// API
//

Broker.channel.on({
    'login:start': start
});

export default {
    start: start
};