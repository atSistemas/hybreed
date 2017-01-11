import {_, Marionette, Snap} from '~/src/vendor/libs';
import Template from './screen.html'

export default Marionette.View.extend({

    template: _.template(Template),

    className: 'screen',

    ui: {
        header: '.header',
        title: '.header .title',
        leftButton: '.header .button.left',
        rightButton: '.header .button.right',
        snapToggleButton: '.header .button.snap-toggle',
        snapContent: '.snap-content'
    },

    events: {
        'click @ui.leftButton': 'leftButtonPressed',
        'click @ui.rightButton': 'rightButtonPressed',
        'click @ui.snapToggleButton': 'snapTogglePressed'
    },

    regions: {
        menu: '.menu',
        content: '.content'
    },

    type: null,
    title: null,
    leftButtonOpts: null,
    rightButtonOpts: null,

    snapper: {},

    initialize(options) {
        this.type = options.type || 'no-header';
        this.title = options.title || '';
        this.leftButtonOpts = options.leftButtonOpts || {};
        this.rightButtonOpts = options.rightButtonOpts || {};
    },

    onAttach() {
        this.ui.title.html(this.title);
        if(this.type == 'snap') {
            this.initSnap();
            this.initRightButton();
            this.ui.header.addClass('with-snap-toggle-button');
        } else if(this.type == 'normal') {
            this.initLeftButton();
            this.initRightButton();
        } else { //no-header
            this.$el.addClass('no-header');
        }
    },

    initSnap() {
        this.snapper = new Snap({
            element: this.ui.snapContent[0],
            hyperextensible: false,
            touchToDrag: false,
            disable: 'right'
        });
    },

    initLeftButton() {
        if(this.leftButtonOpts) {
            this.ui.header.addClass('with-left-button');
            this.ui.leftButton.addClass(this.leftButtonOpts.class);
        }
    },

    initRightButton() {
        if(this.rightButtonOpts) {
            this.ui.header.addClass('with-right-button');
            this.ui.rightButton.addClass(this.rightButtonOpts.class);
        }
    },

    leftButtonPressed: function() {
        if(this.leftButtonOpts.callback) {
            this.leftButtonOpts.callback();
        }
    },

    rightButtonPressed: function() {
        if(this.rightButtonOpts.callback) {
            this.rightButtonOpts.callback();
        }
    },

    snapTogglePressed() {
        if(this.snapper.state().state == 'left') {
            this.snapper.close();
        } else {
            this.snapper.open('left');
        }
    }
});
