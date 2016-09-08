import ItemsListView from './views/itemsList'
import {Backbone, Broker} from 'vendor/libs';

var itemsListView;

function start() {
    showExampleView();
}

function showExampleView() {

    itemsListView = new ItemsListView({
        collection: new Backbone.Collection(
            [{name: 'Item1'}, {name: 'Item2'}, {name: 'Item3'}]
        )
    });

    itemsListView.on({

        'childview:itemPressed': (view) => {
            Broker.channel.trigger('example:start', view.model);
        }
    });

    Broker.channel.trigger('screen:start', {
        type: 'snap',
        title: 'Items List',
        contentView: itemsListView,
        menuView: Broker.channel.request('menu:getView')
    });
}

//
// API
//

Broker.channel.on({
    'itemsList:start': start
});

export default {
    start
};