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
        var Fastclick = require('fastclick'), $, Spinner = require('spin');
        try { $ = require('jquery'); } catch (e) {}
        factory(root, exports, $, Fastclick, Spinner);

    } else {
        root.Hybreed = factory(root, {}, root.jQuery, root.Fastclick, root.Sipinner);
    }

})(function(root, Hybreed, $, Fastclick, Spinner) {

    Hybreed.version = '5.0.0';
    Hybreed.enabled = true;
    Hybreed.el = null;
    Hybreed.online = false;
    Hybreed.mobile = false;
    Hybreed.platform = null;
    Hybreed.location = null;

    Hybreed.init = function (b) {

        Hybreed.debug(b);
        Hybreed.log('[Hybreed] Init');
        Hybreed.log('[Hybreed] Version ' + Hybreed.version);
        Hybreed.log('[Hybreed] PixelRatio: ' + window.devicePixelRatio + ' (' + window.screen.width + 'x' + window.screen.height + ')');

        $.support.cors = true;
        $.ajaxSetup({
            cache: true,
            timeout: 20000
        });

        // JQuery Configuration : Ajax Errors
        $(document).ajaxError(function (event, request, settings) {
            return console.log(request.status + ' ' + request.statusText + ' ' + request.responseText + '\n' + settings.url);
        });

        // ontouchstart: enable CSS active pseudo styles in iOS
        document.addEventListener('touchstart', (function () {
        }), false);

        new Fastclick(document.body);

        /**
         * prevent ugly selection of text and elements in your UI
         * prevent UI elements from displaying a context menu on long-tap
         */
        if (Hybreed.platform === 'ios') {
            document.documentElement.style.webkitTouchCallout = 'none';
            document.documentElement.style.webkitUserSelect = 'none';
            document.documentElement.style.cursor = 'default';
        }

        /**
         * prevent ugly selection of text and elements in your UI
         * prevent UI elements from displaying a context menu on long-tap
         */
        if (Hybreed.platform === 'android') {
            document.addEventListener('longpress', function() {
                return false;
            });
            document.addEventListener('longclick', function() {
                return false;
            });
            document.documentElement.style.cursor = 'default';
        }

    };

    Hybreed.checkNet = function () {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.CELL] = 'Cell generic connection';
        states[Connection.NONE] = 'No network connection';

        Hybreed.log('[Hybreed] Connection type: ' + states[networkState]);

        Hybreed.online = !Connection.NONE && navigator.onLine;

    };

    Hybreed.getLocation = function () {
        var success = function (p) {
            Hybreed.location = p;
            Hybreed.log(p.coords.latitude + ' ' + p.coords.longitude);
        };
        var locFail = function (err) {
            Hybreed.log('ERROR(' + err.code + '): ' + err.message);
        };
        navigator.geolocation.getCurrentPosition(success, locFail);
    };

    Hybreed.getPlatform = function () {
        var platforms = {
            android: /Android/,
            ios: /(iPad)|(iPhone)|(iPod)/,
            blackberry10: /(BB11)/,
            blackberry: /(PlayBook)|(BlackBerry)/,
            windows8: /MSAppHost/,
            windowsphone: /Windows Phone/,
        };
        for (var key in platforms) {
            if (platforms[key].exec(navigator.userAgent)) {
                Hybreed.platform = key;
                Hybreed.mobile = true;
                break;
            }
        }
    };

    Hybreed.debug = function (b) {
        Hybreed.debugEnabled = b;
        Hybreed.el = $('#debugLog');
        return Hybreed.log('[Hybreed] Debugging: ' + b);
    };

    Hybreed.log = function (text, variables) {
        if (Hybreed.debugEnabled) {
            if (variables !== undefined) {
                console.log(text, variables);
            } else {
                console.log(text);
            }
        }
    };

    Hybreed.truncateString = function (str, length) {
        var ellipsis, str1;
        str1 = void 0;
        if (str.length <= length) {
            return str;
        }
        ellipsis = '...';
        str1 = str.slice(0, length);
        return str1 + ellipsis;
    };

    Hybreed.millisecondsToTime = function (milli) {

        function addZ(n) {
            return (n < 10 ? '0' : '') + n;
        }

        var minutes, seconds;
        seconds = Math.floor((milli / 1000) % 60);
        minutes = Math.floor((milli / (60 * 1000)) % 60);
        return addZ(minutes) + ':' + addZ(seconds);
    };

    Hybreed.centerTarget = function (target) {
        var targetNode = document.getElementById(target);
        targetNode.style.marginTop = ((window.innerHeight - targetNode.style.height) / 2) + 'px';
        //console.log('[Hybreed] Centertarget at ' + ((window.innerHeight - targetNode.style.height) / 2) + 'px');
        //$(target).css('marginTop', (($(target).parent().innerHeight() - $(target).position().top - $(target).height()) / 2) + 'px');
    };

    Hybreed.detectDevice = function(){
        var w = window.screen.width,
            h = window.screen.height,
            diagonalSize = Math.sqrt(w*w+h*h);

        console.log('Diagonal Size: ' + diagonalSize);

        var maxDiagonal = 1280;

        if (diagonalSize >= maxDiagonal) {
            return 'tablet';
        } else {
            return 'smartphone';
        }

    };

    Hybreed.isLandscapedTablet = function() {
        if(Hybreed.isAndroid2()) {
            return false;
        } else {
            return matchMedia('only screen and (min-width: 768px) and ' +
            '(max-width: 4096px) and (orientation: landscape)').matches;
        }
    };

    Hybreed.getPressEvent = function() {
        return Hybreed.isIOS() ? 'tap' : 'click';
    };

    Hybreed.isIOS = function() {
        return Hybreed.mobile && _.isEqual(Hybreed.platform, 'ios');
    };

    Hybreed.isAndroid = function() {
        return Hybreed.mobile && _.isEqual(Hybreed.platform, 'android');
    };

    Hybreed.isAndroid2 = function() {
        return Hybreed.mobile && _.isEqual(Hybreed.platform, 'android') &&
            Hybreed.platformVersion.indexOf('2.') === 0;
    };

    Hybreed.start = function(debug) {
        console.log('Hybreed Start!!');

        var deferred = $.Deferred();

        var onDeviceReady = function() {

            console.log('Device Ready!!');

            Hybreed.init(debug);
            //googleAnalytics.init();

            if (Hybreed.mobile === true) {
                navigator.splashscreen.hide();
                Hybreed.checkNet();

                /**
                 * Uncomment to activate Push Service.
                 * Set-up hybreed-push.js with your server and API tokens
                 */
                //Hybreed.Push.init();
            }

            /**
             * Google Analytics
             */
            // Hybreed.Analytics.setTrackingID('UA-XXXXXXXX-X');

            Hybreed.log('[Hybreed Mobile] Init');

            deferred.resolve();

        };

        Hybreed.getPlatform();

        console.log('Hybreed.mobile:' + Hybreed.mobile);

        if (Hybreed.mobile === true) {
            document.addEventListener('online', Hybreed.checkNet, false); // Cordova
            document.addEventListener('offline', Hybreed.checkNet, false); // Cordova
            document.addEventListener('deviceready', onDeviceReady, false); // This
        }
        else {
            // Polyfill for navigator.notification features to work in browser when debugging
            navigator.notification = {
                alert: function (message) {
                    return alert(message);
                }
            };
            onDeviceReady(true);
        }

        return deferred.promise();
    };

    Hybreed.UI = {


        defaultUIOptions: {
            bounce: true,
            mouseWheel: true,
            probeType: 1,
            click: true,
            tap: true
        },

        $spinner: $('#spinner'),

        generateScroll: function (selector, options) {
            require('iscroll');
            var scroll = null;

            var scrolloptions = this.collect(this.defaultUIOptions, options),
                force = false;

            if(!_.isNull(options)){
                force = options.hasOwnProperty('force');
            }

            if (Hybreed.mobile && Hybreed.platform !== 'ios' && force === false) {
                $(selector).css('overflow', 'scroll');
            } else {
                $(selector).css('overflow', 'hidden');
                /*if (_.isNull(options)) {
                 scroll = new IScroll(selector, this.defaultUIOptions);
                 } else {
                 scroll = new IScroll(selector, options);
                 }*/
                scroll = new IScroll(selector, scrolloptions);
            }

            return scroll;
        },

        collect: function(){
            var ret = {},
                len = arguments.length,
                arg,
                i = 0,
                p;

            for (i = 0; i < len; i++) {
                arg = arguments[i];
                if (typeof arg !== 'object') {
                    continue;
                }
                for (p in arg) {
                    if (arg.hasOwnProperty(p)) {
                        ret[p] = arg[p];
                    }
                }
            }
            return ret;
        },

        createSpinner: function (target) {
            var opts = {
                lines: 13,
                length: 9,
                width: 3,
                radius: 12,
                corners: 1.0,
                rotate: 0,
                trail: 60,
                speed: 1.0,
                direction: 1,
                shadow: true,
                hwaccel: true,
                color: '#fff'
            };


            Hybreed.UI.spinnerTarget = document.getElementById(target);
            Hybreed.UI.spinner = new Spinner(opts).spin(Hybreed.UI.spinnerTarget);
        },

        showSpinner: function () {
            Hybreed.UI.spinner.spin(Hybreed.UI.spinnerTarget);
        },

        hideSpinner: function () {
            Hybreed.UI.spinner.stop();
        },

        addClearButton: function(selector){
            require('add-clear');

            /**
             * Available options:
             *
             * Option	    Default	    Type
             * closeSymbol	✖	        string
             * top	        1	        number
             * right	    4	        number
             * returnFocus	true	    boolean
             * showOnLoad	false	    boolean
             * hideOnBlur	false	    boolean
             * onClear	    null	    function
             */

            $(selector).addClear({
                returnFocus: true,
                showOnLoad: true,
                hideOnBlur: false
            });
        },

        toggleInput: function(v){
            return v?'addClass':'removeClass';
        }

    };

    /**
     * Ensure that you have installed the next cordova plugin in order to work correctly
     *
     *      https://github.com/danwilson/google-analytics-plugin.git
     */

    Hybreed.Analytics = {

        UA: null,

        setTrackingID: function (id) {
            if (Hybreed.mobile && Hybreed.online) {
                this.UA = id;
                analytics.startTrackerWithId(id);
                Hybreed.log('[Hybreed Analytics] Add tracking ID: ' + id);
            } else {
                Hybreed.log('[Hybreed Analytics] Warning: No mobile environment detected. Cannot setup tracking ID.');
            }
        },

        trackView: function (viewTitle) {
            if (this.UA === null) {
                Hybreed.log('[Hybreed Analytics] Warning: No application id found. Set it up first.');
            } else if (Hybreed.mobile && Hybreed.online) {
                analytics.trackView(viewTitle);
                Hybreed.log('[Hybreed Analytics] View Tracked: ' + viewTitle);
            }
        },

        trackEvent: function (category, action, label, value) {
            if (this.UA === null) {
                Hybreed.log('[Hybreed Analytics] Warning: No application id found. Set it up first.');
            } else if (Hybreed.mobile && Hybreed.online) {
                analytics.trackEvent(category, action, label, value);
                Hybreed.log('[Hybreed Analytics] Event Tracked: ' + category + '-' + action + '-' + label + '-' + value);
            }
        },

        addCustomDimension: function (key, value, success, error) {
            if (Hybreed.mobile && Hybreed.online) {
                analytics.addCustomDimension(key, value, success, error);
                Hybreed.log('[Hybreed Analytics] Add custom dimension: ' + key + ' with value: ' + value);
            } else {
                Hybreed.log('[Hybreed Analytics] Warning: No mobile environment detected. Cannot add custom dimension.');
            }
        }
    };

    /**
     * Ensure that you have installed the next cordova plugin in order to work correctly
     *
     *      org.jboss.aerogear.cordova.push
     */

    Hybreed.Push = {

        successHandler: function (message) {
            Hybreed.log('[Hybreed Push Service] Registration Success: ' + message);
        },

        errorHandler: function (message) {
            Hybreed.log('[Hybreed Push Service] Registration Failed: ' + message);

        },

        onNotification: function (e) {
            // alert(e.alert);
            //var notify = document.getElementById('notify');
            //notify.innerHTML = e.alert;
            navigator.notification.alert(e.alert, function(){}, 'Mensaje Recibido', 'Aceptar');
            alert(e.alert);
        },

        conf: null,
        
        configIOS: {
            senderID: '',
            pushServerURL: '',
            variantID: '',
            variantSecret: ''
        },

        setConfigIOS: function (configIos) {
            this.configIOS = configIos;
        },

        configAndroid: {
            senderID: '',
            pushServerURL: '',
            variantID: '',
            variantSecret: ''
        },

        setConfigAndroid: function (configAndroid) {
            this.configAndroid = configAndroid;
        },

        init: function () {
            console.log('initializing Push...');

            switch (Hybreed.platform){
                case 'ios':
                    this.conf = this.configIOS;
                    this.register();
                    break;
                case 'android':
                    this.conf = this.configAndroid;
                    this.register();
                    break;
                default :
                    Hybreed.log('[Hybreed Push Service] WARNING: No configuration found for platform ' + Hybreed.platform);
            }
        },

        register: function (){
            push.register(
                this.successHandler,
                this.errorHandler,
                {
                    'badge': 'true',
                    'sound': 'true',
                    'alert': 'true',
                    ecb: 'this.onNotification',
                    pushConfig: this.conf
                });
        }
    };

    return Hybreed;
});
