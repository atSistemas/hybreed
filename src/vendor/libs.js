import _ from  'underscore';
import $ from 'jquery';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Broker from 'backbone.radio';
import Hybreed from '~/src/vendor/hybreed/hybreed';
import Snap from 'snapjs';
import ionRangeslider from 'ion-rangeslider';

window.$ = window.jQuery = global.jQuery = $;

export {
    _,
    Backbone,
    Marionette,
    Broker,
    Hybreed,
    Snap,
    ionRangeslider
};
