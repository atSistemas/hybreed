import 'vendor/libs';
import App from 'common/app';
import MainController from 'modules/main';

$(document).ready(() => {
    console.log("Document ready!");
    window.Hybreed.start(true)
      .then(function(){
          App.start();
          MainController.start();
      });
});