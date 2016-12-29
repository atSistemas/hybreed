

  //chai.use(sinonChai);
  var expect = chai.expect;
  console.log("OK!!!");

  mocha.setup({
    ui: 'bdd',
    ignoreLeaks: true
  });

  window.onload = function () {
    (window.mochaPhantomJS || mocha).run();
  }




