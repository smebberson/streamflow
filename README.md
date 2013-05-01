streamflow
==========

Event-based streaming HTML parser.

Use streamflow to parse HTML, walk the node tree and fire an event on every node that it encounters.

Example
-------

```
"use strict";

var streamflow = require('streamflow');

sf.on('node', function (previousTag, currentTag, nextTag) {
	
	// do something with the tag currently being passed

});

sf.parse('<html><head></head><body class="what"></body></html>').should.be.an.instanceOf(Object);
```