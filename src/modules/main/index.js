import App from 'common/app';
import MainView from './views/main';
import {Broker} from 'vendor/libs';

var mainView;

function start() {
    Broker.channel.trigger('login:start');
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

//
// API
//

Broker.channel.on({
    'main:start': start,
    'main:showScreen': showScreen
});

export default {
    start: start,
    showScreen: showScreen
};