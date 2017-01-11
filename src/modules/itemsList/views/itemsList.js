import {_, Marionette} from '~/src/vendor/libs';
import ItemTemplate from './item.html';
import ItemsListTemplate from './itemsList.html';

var ChildView = Marionette.View.extend({

    template: _.template(ItemTemplate),

    tagName: 'li',

    triggers: {
        click: 'itemPressed'
    }
});

export default Marionette.CollectionView.extend({

    template: _.template(ItemsListTemplate),

    tagName: 'ul',

    className: 'items-list',

    childView: ChildView
});
