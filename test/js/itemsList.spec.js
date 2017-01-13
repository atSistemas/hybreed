import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.should();
var expect = chai.expect;
chai.use(sinonChai);

import App from '~/src/common/app';

import * as Libs from '~/src/vendor/libs'
import ItemsList from '~/src/modules/itemsList/index';

import ItemsListView from '~/src/modules/itemsList/views/itemsList'

describe('ITEMSLIST MODULE', () => {
    var testContext = {};
    var logInfo;

    before(() => {
        var mainDom = '<div id="main"></div>';
        document.body.insertAdjacentHTML('afterbegin', mainDom);
        App.start();

        let itemsListView = new ItemsListView(
            [{name: 'Item1'}, {name: 'Item2'}, {name: 'Item3'}]
        );
        itemsListView.render();
    });

    beforeEach(() => {
        logInfo = null;
        testContext.mainModule = ItemsList;
        testContext.broker = Libs.Broker;
    });

    afterEach(() => {
        if (logInfo != null){
            console.log("||--------------||");
            console.log(logInfo);
            console.log("||--------------||");
        }
    });

    it('should return a start function', () => {
        expect(testContext.mainModule.start).to.exist;
        testContext.mainModule.start.should.be.a('function');
    });

    it('should have a list with 3 elements', () => {
        // Having
        testContext.broker.channel('itemsList').trigger("start");
        // Expect
        expect($(".items-list li").length).to.equal(3);
    });

    it('should register a item call and show item detail', () => {
        // Having
        var spy = sinon.spy();
        testContext.broker.channel('example').on('start', spy);
        // Then
        testContext.broker.channel('itemsList').trigger("start");
        $('.items-list li').click();
        // Expect
        spy.should.have.been.called;
    });


});
