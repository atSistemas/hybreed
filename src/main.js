import '~/src/vendor/libs';
import '~/src/modules/modules';
import App from '~/src/common/app';
import {Hybreed, Broker} from '~/src/vendor/libs';

$(document).ready(() => {

    Hybreed.start(true)
      .then(() => {
          App.start();
          Broker.channel('main').trigger('start');
      });
});
