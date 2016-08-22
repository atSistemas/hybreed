import 'vendor/libs';
import App from 'common/app';
import MainController from 'modules/main';

$(document).ready(() => {
    window.Hybreed.start(true);
    App.start();
    MainController.start();
});