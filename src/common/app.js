import {Marionette, Hybreed} from 'vendor/libs';

var app = new Marionette.Application({
    region: '#main'
});

app.on('initialize:after', function () {
    if (!Backbone.history.started) {
        return Backbone.history.start();
    }
});

Hybreed.UI.createSpinner('main');

export default app;