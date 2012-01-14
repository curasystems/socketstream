var EventEmitter2;

EventEmitter2 = require('eventemitter2').EventEmitter2;

exports.Router = (function() {

  function Router() {
    this.ee = new EventEmitter2({
      wildcard: true,
      delimiter: '?'
    });
  }

  Router.prototype.route = function(url, req, res) {
    var newUrl, sr;
    if (this.ee.listeners(url).length > 0) {
      return this.ee.emit(url, req, res);
    } else {
      sr = url.split('/');
      sr.pop();
      newUrl = sr.join('/');
      if (!(newUrl.length > 0)) newUrl = '/';
      return this.route(newUrl, req, res);
    }
  };

  Router.prototype.on = function(url, cb) {
    if (url.substring(0, 1) === '/' && url.indexOf(' ') === -1) {
      return this.ee.on(url, cb);
    } else {
      throw new Error(url + ' is not a valid URL. Valid URLs must start with /');
    }
  };

  return Router;

})();