const connect = require('connect');
const errHandler = require('./error');

connect().use(errHandler).listen(3000);
