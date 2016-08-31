import MainController from 'modules/main';
import LoginView from './views/login'

var loginView;

function start() {
    showExampleView();
}

function showExampleView() {
    loginView = new LoginView();
    MainController.show({
        onBackPressed: false,
        title: 'login',
        view: loginView,
        showHeader: false
    });
    associateEventsLoginView();
}

function associateEventsLoginView() {
    loginView.on('accessButton', function() {
        console.log(loginView.ui.user.val());
        console.log(loginView.ui.pw.val());
        MainController.startExample();
    });
}

export default {
    start: start
};