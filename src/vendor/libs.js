import _ from  'underscore';
import $ from 'jquery';
import Marionette from 'backbone.marionette';
import Backbone from 'backbone.marionette/node_modules/backbone';
import Snap from 'snapjs';
import Hybreed from 'vendor/hybreed/hybreed';
import Broker from 'vendor/hybreed/hybreed-broker';

window.$ = window.jQuery = $;
window.Snap = Snap;

require('ion-rangeslider');

export {_, Marionette, Backbone, Hybreed, Broker};