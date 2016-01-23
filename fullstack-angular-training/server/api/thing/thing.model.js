'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ThingSchema = new mongoose.Schema({
	number: Number,
	street: String,
	city: String,
	postcode: Number,
	firstname: String,
	lastname: String,
    	latitude: Number,
    	longitude: Number
});

export default mongoose.model('Thing', ThingSchema);
