import LoginView from './views/login'
import {Broker} from '~/src/vendor/libs';

var loginView;

function start() {
    showLoginView();
}

function showLoginView() {

    loginView = new LoginView();

    Broker.channel('screen').trigger('start', {
        type: 'no-header',
        contentView: loginView
    });

    loginView.on({
        login(user, password) {
            console.log(`Login with ${user} ${password}`);
            localStorage.login = user;
            Broker.channel('itemsList').trigger('start');
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

Broker.channel('login').on({
    start,
    logout
});

Broker.channel('login').reply({
    getUserLogged
});

export default {
    start,
    getUserLogged,
    logout
};
