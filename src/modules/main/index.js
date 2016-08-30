import App from 'common/app';
import MainView from './views/main';
//import ExampleController from 'modules/example';
//import LoginController from 'modules/login';
import {ExampleController, LoginController} from 'Modules';

var mainView;
var onBackPressed;

function start() {
    showMainView();
    LoginController.start();
}

function startExample() {
    ExampleController.start();
}

function returnLogin() {
    LoginController.start();
}

function showMainView() {
    mainView = new MainView();
    App.showView(mainView);
}

function show(params) {
    mainView.toggleHeader(params.showHeader);
    onBackPressed = params.onBackPressed;
    mainView.toggleBackButton(onBackPressed);
    mainView.setTitle(params.title);
    mainView.getRegion('content').show(params.view);
    associateEventsMainView();
}

function associateEventsMainView() {
    mainView.on('backPressed', onBackPressed);
}

export default {
    start: start,
    show: show,
    startExample: startExample,
    returnLogin: returnLogin
};