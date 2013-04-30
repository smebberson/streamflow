"use strict";

/* global describe, it */

var should = require('should');

describe("streamflow", function() {

	var streamflow = require('../streamflow');
	var sf;

	beforeEach(function () {

		sf = new streamflow.Streamflow();

	});

	// check EventEmitter inheritence
	it("should have an on method", function () {
		sf.on.should.be.an.instanceOf(Function);
	});

	// check EventEmitter inheritence
	it("should have an emit method", function () {
		sf.emit.should.be.an.instanceOf(Function);
	});

	it("should parse HTML and return a map", function() {

		sf.parse('<html><head></head><body class="what"></body></html>').should.be.an.instanceOf(Object);

	});

});