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

	it("should fire a node event for each node when walking the tree", function () {

		var spy = sinon.spy();
		sf.on('node', spy);

		sf.parse('<html><head></head><body class="what"></body></html>').should.be.an.instanceOf(Object);

		spy.called.should.be.true;

	});

	it("should not fire an event for those nodes with children that shouldn't be walked (via string)", function () {

		var spy = sinon.spy();
		sf.on('node', spy);

		sf.addIgnoreNestedWithin('h3');
		sf.parse('<html><head></head><body class="what"><h1>Test body</h1><p>This is a paragraph.</p><h3><em>heading three title</em></h3></body></html>');

		spy.callCount.should.equal(8);

	});

	it("should not fire an event for those nodes with children that shouldn't be walked (via array)", function () {

		var spy = sinon.spy();
		sf.on('node', spy);

		sf.addIgnoreNestedWithin(['h3','p']);
		sf.parse('<html><head></head><body class="what"><h1>Test body</h1><p>This is a paragraph.</p><h3><em>heading three title</em></h3></body></html>');

		spy.callCount.should.equal(7);

	});

});