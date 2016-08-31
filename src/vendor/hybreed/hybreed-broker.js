//TODO Cambiar copyright
/*
 *
 * This file is part of the Hybreed package.
 * @license Copyright (c) 2010-2014, atSistemas S.A. All Rights Reserved.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 */
(function(factory) {

    // Establish the root object, `window` (`self`) in the browser, or `global` on the server.
    // We use `self` instead of `window` for `WebWorker` support.
    var root = (typeof self == 'object' && self.self === self && self) ||
        (typeof global == 'object' && global.global === global && global);

    if (typeof exports !== 'undefined') {
        var Wreqr = require('backbone.wreqr');
        factory(root, exports, Wreqr);

    } else {
        root.Broker = factory(root, {}, root.Wreqr);
    }

})(function(root, Broker, Wreqr) {

    Broker.commands = new Wreqr.Commands();
    Broker.reqres = new Wreqr.RequestResponse();
    Broker.events = new Wreqr.EventAggregator();

    Broker.showViewInContent = function (view, content, preventDestroy, animationType) {
        preventDestroy = preventDestroy || false;
        this.events.trigger('app:show:' + content, view, preventDestroy);
        if (!_.isUndefined(animationType)) {
            view.$el.one('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd',function () {
                $(this).removeClass('animated ' + animationType);
            }).addClass('animated ' + animationType);
        }
    };

    Broker.showViewInLayout = function (view, layout, preventDestroy, animationType) {
        preventDestroy = preventDestroy || false;
        layout.show(view, {preventDestroy: preventDestroy});
        if (!_.isUndefined(animationType)) {
            view.$el.one('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd',function () {
                $(this).removeClass('animated ' + animationType);
            }).addClass('animated ' + animationType);
        }
    };

    return Broker;

});
