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

  it('should return logged user from localStorage', () => {
    localStorage.login = "John Doe Garcia";
    let usr = testContext.broker.channel('login').request('getUserLogged');
    expect(usr).to.equal('John Doe Garcia');

  });

  it('should perform logout and show login view', () => {
    // Prepare spy to register login view loading
    var spy = sinon.spy();
    testContext.broker.channel('screen').on('start', spy);
    // Call logout
    testContext.broker.channel('login').trigger('logout');
    // Expect
    expect(localStorage.login).to.be.undefined;
    spy.should.have.been.called;
  });

  it('should register a login call and show itemsList', () => {
    // Having

    // Then

    // Expect

  })


});
