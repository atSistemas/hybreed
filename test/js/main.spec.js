import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.should();
var expect = chai.expect;
chai.use(sinonChai);

import * as Libs from '~/src/vendor/libs'
import Main from '~/src/modules/main/index';


describe('MAIN MODULE', () => {
  var testContext = {};
  var logInfo;

  beforeEach(() => {
      logInfo = null;
      testContext.mainModule = Main;
      testContext.broker = Libs.Broker;
  });

  afterEach(() => {
    if (logInfo != null){
      console.log("||--------------||");
      console.log(logInfo);
      console.log("||--------------||");
    }
  })

  it('should return a start function', () => {
    expect(testContext.mainModule.start).to.exist;
    testContext.mainModule.start.should.be.a('function');
  });

  it('should be started with a Broker call', () =>  {

    // We can't spy the start function called by Broker,
    // cause broker has linked to the original function, not the wrapped spy.
    // So we can create new spy and link to the calls performed by the
    // start function

    var spy = sinon.spy();
    // There are two possibilities based on user logged in or not
    testContext.broker.channel('itemsList').on("start", spy);
    testContext.broker.channel('login').on("start", spy);

    testContext.broker.channel('main').trigger('start');
    spy.should.have.been.called;

  });
});
