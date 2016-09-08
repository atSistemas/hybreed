import LoginView from './views/login'
import {Broker} from 'vendor/libs';

var loginView;

function start() {
    showLoginView();
}

function showLoginView() {

    loginView = new LoginView();

    Broker.channel.trigger('screen:start', {
        type: 'no-header',
        contentView: loginView
    });

    loginView.on({
        login(user, password) {
            console.log(`Login with ${user} ${password}`);
            localStorage.login = user;
            Broker.channel.trigger('itemsList:start');
        }
    });
}

function getUserLogged() {
    return localStorage.login;
}

function logout() {
    delete localStorage.login;
    showLoginView();
}

//
// API
//

Broker.channel.on({
    'login:start': start,
    'login:logout': logout
});

Broker.channel.reply({
    'login:getUserLogged': getUserLogged
});

export default {
    start,
    getUserLogged,
    logout
};