var server = require('./server');
var route = require('./route');
var requestHandles = require('./requestHandles');
var handle = {};
handle['/'] = requestHandles.start;
handle['/start'] = requestHandles.start;
handle['/upload'] = requestHandles.upload;
handle['/show'] = requestHandles.show;
server.start(route.route, handle);