import ExampleView from './views/example'
import {Broker} from '~/src/vendor/libs';

var exampleView;

function start(model) {
    showExampleView(model);
}

function showExampleView(model) {

    exampleView = new ExampleView({
        model: model
    });

    Broker.channel('screen').trigger('start', {
        type: 'normal',
        title: 'Example',
        leftButtonOpts: {
            class: 'fa fa-chevron-left',
            callback() {
                Broker.channel('itemsList').trigger('start');
            }
        },
        contentView: exampleView
    });
}

//
// API
//

Broker.channel('example').on({
    start
});

export default {
    start
};
