import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.should();
var expect = chai.expect;
chai.use(sinonChai);

import * as Libs from '~/src/vendor/libs'
import Login from '~/src/modules/login/index';



describe('LOGIN MODULE', () => {
  var testContext = {};
  var logInfo;

  beforeEach(() => {
      logInfo = null;
      testContext.mainModule = Login;
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

  it('should return a getUserLogged function', () => {
    expect(testContext.mainModule.getUserLogged).to.exist;
    testContext.mainModule.getUserLogged.should.be.a('function');
  });

  it('should return a logout function', () => {
    expect(testContext.mainModule.logout).to.exist;
    testContext.mainModule.logout.should.be.a('function');
  });

});
