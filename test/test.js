"use strict";

/* global describe, it */

var should = require('should');
var streamflow = require('../streamflow');

describe("streamflow", function() {

	it("should parse HTML and return a map", function() {

		var sf = new streamflow.Streamflow();
		sf.parse('<html><head></head><body class="what"></body></html>').should.be.an.instanceOf(Object);

	});

});