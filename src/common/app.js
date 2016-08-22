var app = new Marionette.Application();

window.Hybreed.UI.createSpinner('main');

app.addRegions({
    main: '#main'
});

app.on('initialize:after', function () {
    if (!Backbone.history.started) {
        return Backbone.history.start();
    }
});

export default app;