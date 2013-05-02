"use strict";

// load node modules
var util = require('util');
var htmlparser = require('htmlparser');
var events = require('events');
var _ = require("underscore");

(function () {

	var exports = module.exports;

	// Class
	function Streamflow (options) {

		// class variables
		this._dom = {};
		this._previousTag = {};
		this._ignoreNestedWithin = [];

		// define arguments
		this._options = options || {};

	}

	// mixin the EventEmitter prototypes
	Streamflow.prototype.__proto__ = events.EventEmitter.prototype;

	// public method
	Streamflow.prototype.addIgnoreNestedWithin = function Streamflow$addIgnoreNested (tag) {

		if (!_.contains(this._ignoreNestedWithin, tag)) {
			this._ignoreNestedWithin.push(tag);
		}

	};

	// public method
	Streamflow.prototype.parse = function Streamflow$parse (html) {

		// set local variables 
		var _this = this;

		// parse the HTML document
		new htmlparser.Parser(

			new htmlparser.DefaultHandler(
				function (err, dom) {
					_this._dom = dom;
				},
				{verbose: true, ignoreWhitespace: true}
			)

		).parseComplete(html);

		// walk the tree
		this.walk();

		// return the tree
		return this._dom;

	};

	// private method
	Streamflow.prototype.walk = function (dom) {

		// local variables
		var i;
		var tag;
		var nextTag;

		// the argument is optional, grab the dom from the class if not passed in
		dom = dom || this._dom;

		// walk the dom tree
		for (i = 0; i < dom.length; i++) {

			// current tag
			tag = dom[i];
			nextTag = dom[i+1] || {};

			// fire a generic node event
			this.emit('node', this._previousTag, tag, nextTag);

			// update the previousTag
			this._previousTag = tag;

			// does the tag have children, recursively walk
			if (tag.children && !_.contains(this._ignoreNestedWithin, tag.name)) this.walk(tag.children);

		}

	}

	// make the Streamflow class available
	exports.Streamflow = Streamflow;

})();