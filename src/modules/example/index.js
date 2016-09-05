import ExampleView from './views/example'
import {Broker} from 'vendor/libs';

var exampleView;

function start() {
    showExampleView();
}

function showExampleView() {

    exampleView = new ExampleView();

    Broker.channel.trigger('screen:start', {
        type: 'snap',
        title: 'Example',
        leftButtonOpts: {
            class: 'fa fa-chevron-left',
            callback() {
                Broker.channel.trigger('login:start');
            }
        },
        contentView: exampleView
    });
}

//
// API
//

Broker.channel.on({
    'example:start': start
});

export default {
    start: start
};