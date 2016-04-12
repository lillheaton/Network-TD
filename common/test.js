
var steering = require('./steering');
var vector = require('victor');

var kalle = new vector(100, 0);
var sven = new vector(1000, 1000);

steering.seek(kalle, new vector(0.1, 0.1), sven);