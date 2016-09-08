import ExampleView from './views/example'
import {Broker} from 'vendor/libs';

var exampleView;

function start(model) {
    showExampleView(model);
}

function showExampleView(model) {

    exampleView = new ExampleView({
        model: model
    });

    Broker.channel.trigger('screen:start', {
        type: 'normal',
        title: 'Example',
        leftButtonOpts: {
            class: 'fa fa-chevron-left',
            callback() {
                Broker.channel.trigger('itemsList:start');
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
    start
};