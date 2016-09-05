import {Broker} from 'vendor/libs';

function start() {
    Broker.channel.trigger('login:start');
}

//
// API
//

Broker.channel.on({
    'main:start': start
});

export default {
    start: start
};