import _ from  'underscore';
import $ from 'jquery';
import Marionette from 'backbone.marionette';
import Snap from 'snapjs';
import Hybreed from 'vendor/hybreed/hybreed';
import Broker from 'vendor/hybreed/hybreed-broker';

window.$ = window.jQuery = $;
window._ = _;
window.Marionette = Marionette;
window.Snap = Snap;
window.Hybreed = Hybreed;

require('ion-rangeslider');

export {Hybreed, Broker};