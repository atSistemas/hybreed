import {Broker} from 'vendor/libs';

function start() {
    if(Broker.channel.request('login:getUserLogged')) {
        Broker.channel.trigger('itemsList:start');
    } else {
        Broker.channel.trigger('login:start');
    }
}

//
// API
//

Broker.channel.on({
    'main:start': start
});

export default {
    start
};