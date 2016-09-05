import 'vendor/libs';
import 'modules/modules';
import App from 'common/app';
import {Broker} from 'vendor/libs';

$(document).ready(() => {

    window.Hybreed.start(true)
      .then(() => {
          App.start();
          Broker.channel.trigger('main:start');
      });
});