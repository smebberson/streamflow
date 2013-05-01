"use strict";

/* global describe, it */

var should = require('should');
var util = require('util');
var sinon = require('sinon');

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

	it("should fire a node event", function () {

		var spy = sinon.spy();
		sf.on('node', spy);

		spy.called.should.equal.true;

	});

});