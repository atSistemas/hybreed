import App from 'common/app';
import MainView from './views/main';
//import ExampleController from 'modules/example';
//import LoginController from 'modules/login';
import {ExampleController, LoginController} from 'Modules';

var mainView;

function start() {
    //LoginController.start();
    ExampleController.start();
}

function startExample() {
    ExampleController.start();
}

function returnLogin() {
    LoginController.start();
}

/*
 options = {
     type: string ('snap', 'normal', 'no-header')
     title: string,
     leftButtonOpts: {
         class: string,
         callback: function
     },
     rightButtonOpts: {
         class: string,
         callback: function
     },
     contentView: view
 };
 */

function showScreen(options) {
    mainView = new MainView(options);
    App.showView(mainView);
    mainView.getRegion('content').show(options.contentView);
}

export default {
    start: start,
    showScreen: showScreen,
    startExample: startExample,
    returnLogin: returnLogin
};