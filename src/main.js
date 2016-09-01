import 'vendor/libs';
import 'modules'
import App from 'common/app';
import {Broker} from 'vendor/libs';

$(document).ready(() => {
    window.Hybreed.start(true)
      .then(function(){
          App.start();
          Broker.channel.trigger('main:start');
      });
});