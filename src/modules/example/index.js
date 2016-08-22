import MainController from 'modules/main';
import ExampleView from './views/example'

var exampleView;

function start() {
    showExampleView();
}

function showExampleView() {
    exampleView = new ExampleView();
    MainController.show({
        onBackPressed: () => {
            MainController.returnLogin();
        },
        title: 'Example',
        view: exampleView,
        showHeader: true
    });
    associateEventsExampleView();
}

function associateEventsExampleView() {

}

export default {
    start: start
};