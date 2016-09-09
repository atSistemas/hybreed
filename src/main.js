import 'vendor/libs';
import 'modules/modules';
import App from 'common/app';
import {Hybreed, Broker} from 'vendor/libs';

$(document).ready(() => {

    Hybreed.start(true)
      .then(() => {
          App.start();
          Broker.channel('main').trigger('start');
      });
});