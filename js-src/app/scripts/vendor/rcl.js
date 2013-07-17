
(function(root, console){
  "use strict";

  var name = 'rcl',
    storedLevel = root.localStorage ? parseInt(root.localStorage.getItem(name + '.level') || 0,10) : 0;

  function getCaller() {
    try { throw new Error(''); } catch(err) {
      var depth,
        stack,
        caller,
        callerParts,
        original = '',
        parts = [];

      if (err.stack) {
        depth = 5;
        stack = err.stack.split("\n");
        caller = stack[depth];
        callerParts = caller.match(/\s*\(?([^\s\)]*)\)?$/);
        original = callerParts[1];
        parts = original.match(/^.*([\/<][^\/>]*>?):(\d*):(\d*)$/);
      }

      return {
        original : original,
        file : parts ? parts[1] : '[null]',
        line : parts ? parts[2] : '0',
        col : parts ? parts[3]  : '0'
      };
    }
  }

  function stringify(obj) {
    if (typeof obj !== 'object') return obj;

    var cache = [], keyMap = [], tempArray, index;

    var string = JSON.stringify(obj, function(key, value) {
      // Let json stringify falsy values
      if (!value) return value;

      // If we're a node
      if (value instanceof Node) return '[ Node ]';

      // If we're a window (logic stolen from jQuery)
      if (value.window && value.window == value.window.window) return '[ Window ]';

      // Simple function reporting
      if (typeof value === 'function') return '[ Function ]';

      if (typeof value === 'object' && value !== null) {

        // Check to see if we have a pseudo array that can be converted
        if (value.length && (tempArray = Array.prototype.slice.call(value)).length === value.length) value = tempArray

        if (index = cache.indexOf(value) !== -1) {
          // If we have it in cache, report the circle with the key we first found it in
          return '[ Circular {' + (keyMap[index] || 'root') + '} ]';
        }
        cache.push(value);
        keyMap.push(key);
      }
      return value;
    });
    return string;
  }

  root[name] = (function(){
    var socket,
      cache = [],
      api = {
        _logLevel : storedLevel,
        client    : true,
        server    : true,
        loaded    : false
      },
      isLoading = false,
      levels = [
        'trace',
        'debug',
        'info',
        'warn',
        'error'
      ];

    function includeSocketIo() {
      if (isLoading) return;
      isLoading = true;
      if (typeof root.define === 'function' && root.define.amd) {
        if (typeof root.require === 'function') {
          root.require.config({
            paths : {
              io : 'http://' + api.host + ':' + api.port + '/socket.io/socket.io.js'
            }
          })
          root.require(['io'],onLoadIo)
        }
      } else {
        var script = document.createElement('script');
        script.src = 'http://' + api.host + ':' + api.port + '/socket.io/socket.io.js';
        script.onload = onLoadIo;
        if (document.head) document.head.appendChild(script);
        else document.getElementsByTagName("head")[0].appendChild(script);
      }
    }


    function emit(level,args) {
      if (levels[level] < api._logLevel) return;
      if (api.client) logConsole.apply(null, arguments);
      if (api.server) logIo.apply(null, arguments);
      if (!socket) return api.connect();
    }

    function logConsole(level,args) {
      // Log trace as debug to accommodate console.trace not actually logging.
      level = level === 'trace' ? 'debug' : level;
      if (console) {
        if (console[level])   console[level].apply(console,args);
        else if (console.log) Function.prototype.apply.call(console.log,console,[level].concat(args));
      }
    }

    function logIo(level,args) {
      var data;

      if (typeof args === 'object' && !args.length) data = args
      else {
        data = {
          level   : level,
          args    : args,
          caller  : getCaller()
        };
      }

      if (socket) {
        // To account for complex, circular objects before jsonification
        for (var i = 0; i < args.length; i++) args[i] = stringify(args[i]);
        socket.emit(name, data);
      } else {
        cache.push([level, data]);
      }
    }

    function logLevel(level) {
      return function() {
        emit(level,[].slice.call(arguments));
      };
    }

    function onConnect() {
      var cached = null;
      while (cached = cache.shift()) {
        logIo.apply(null,cached);
      }
    }

    function onLoadIo() {
      api.connect();
    }

    for (var i = 0; i < levels.length; i++) {
      var level = levels[i];
      api[level] = logLevel(level); // e.g. .info (log method)
      api[level.toUpperCase()] = i; // e.g. .INFO (level enum)
    }

    api.connect = function(host, port, redux) {
      host = host || '127.0.0.1';
      port = port || 8888;
      api.host = host;
      api.port = port;
      if (root.io) {
        socket = root.io.connect('http://' + host + ':' + port);
        socket.on('connect',onConnect);
      }
      else if (!redux) {
        includeSocketIo();
        api.connect(host, port, true);
      }
    };

    api.logLevel = function(level) {
      api._logLevel = level;
      root.localStorage && root.localStorage.setItem(name + '.level',level);
    };

    return api;
  })();

})(this, console);

