import MainController from 'modules/main';
import ExampleView from './views/example'

var exampleView;

function start() {
    showExampleView();
}

function showExampleView() {
    exampleView = new ExampleView();
    MainController.showScreen({
        type: 'snap',
        title: 'Example',
        leftButtonOpts: {
            class: 'fa fa-chevron-left',
            callback() {
                MainController.returnLogin();
            }
        },
        contentView: exampleView
    });
    associateEventsExampleView();
}

function associateEventsExampleView() {

}

export default {
    start: start
};