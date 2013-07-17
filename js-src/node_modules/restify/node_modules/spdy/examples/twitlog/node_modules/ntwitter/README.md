Asynchronous Twitter client API for node.js
===========================================

[ntwitter](http://github.com/AvianFlu/ntwitter) is an upgraded version of jdub's [node-twitter](http://github.com/jdub/node-twitter), which in turn was inspired by, and uses some code from, technoweenie's [twitter-node](http://github.com/technoweenie/twitter-node).

## Version 0.2.7

## Installation

You can install ntwitter and its dependencies with npm: `npm install ntwitter`.


## Getting started

This library is, for the most part, the same API as `node-twitter`. Much of the documentation below is straight from `node-twitter` - credit goes to [jdub](http://github.com/jdub) for putting all this together in the first place. 

The most significant API change involves error handling in callbacks.  Callbacks should now look something like this:

     function (err, result) {
       if (err) {return callback(err)}
       // Do something with 'result' here
     }

Where `callback` is the parent function's callback.  (Or any other function you want to call on error.)

### Setup API 

The keys listed below can be obtained from [dev.twitter.com](http://dev.twitter.com) after setting up a new App.

	var twitter = require('ntwitter');

	var twit = new twitter({
		consumer_key: 'Twitter',
		consumer_secret: 'API',
		access_token_key: 'keys',
		access_token_secret: 'go here'
	});


### REST API 

Note that all functions may be chained:

	twit
		.verifyCredentials(function (err, data) {
			console.log(console.dir(data));
		})
		.updateStatus('Test tweet from ntwitter/' + twitter.VERSION,
			function (err, data) {
				console.log(console.dir(data));
			}
		);

### Search API 

	twit.search('nodejs OR #node', function(err, data) {
		console.log(console.dir(data));
	});

### Streaming API 

The stream() callback receives a Stream-like EventEmitter:

Here is an example of how to call the 'statuses/sample' method:

	twit.stream('statuses/sample', function(stream) {
		stream.on('data', function (data) {
			console.log(data);
		});
	});
	
Here is an example of how to call the 'statuses/filter' method with a bounding box over San Fransisco and New York City ( see streaming api for more details on [locations](https://dev.twitter.com/docs/streaming-api/methods#locations) ):

	twit.stream('statuses/filter', {'locations':'-122.75,36.8,-121.75,37.8,-74,40,-73,41'}, function(stream) {
		stream.on('data', function (data) {
			console.log(data);
		});
	});

ntwitter also supports user and site streams:

	twit.stream('user', {track:'nodejs'}, function(stream) {
		stream.on('data', function (data) {
			console.log(console.dir(data));
		});
		// Disconnect stream after five seconds
		setTimeout(stream.destroy, 5000);
	});

## Contributors

- [AvianFlu](http://github.com/AvianFlu) - Upgrades and current support
- [Jeff Waugh](http://github.com/jdub) (primary author)
- [rick](http://github.com/technoweenie) (parser.js and, of course, twitter-node!)

## TODO

- Complete the convenience functions, preferably generated
- Support [recommended reconnection behaviour](http://dev.twitter.com/pages/user_streams_suggestions) for the streaming APIs

