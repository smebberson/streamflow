"use strict";

// load node modules
var util = require('util');
var htmlparser = require('htmlparser');
var events = require('events');

(function () {

	var exports = module.exports;

	// Class
	function Streamflow (options) {

		var self = this;

		this._options = options || {};

	}

	// mixin the EventEmitter prototypes
	Streamflow.prototype.__proto__ = events.EventEmitter.prototype;

	// public property
	Streamflow.prototype.parse = function Streamflow$parse (html) {

		var _dom = {};

		new htmlparser.Parser(

			new htmlparser.DefaultHandler(
				function (err, dom) {
					_dom = dom;
				},
				{verbose: true, ignoreWhitespace: true}
			)

		).parseComplete(html);

		return _dom;

	};

	// make the Streamflow class available
	exports.Streamflow = Streamflow;

})();