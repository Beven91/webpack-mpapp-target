const events = require('events');

module.exports = class CompilerMock {

  constructor() {
    this.emitter = new events.EventEmitter();
    this.compilation = {
      assets: []
    }
    this._plugins = [];
  }

  apply(plugin) {
    this._plugins.push(plugin);
  }

  emitAssets() {
    const fn = jest.fn();
    this.emitter.emit('emit', this.compilation, fn);
  }

  plugin(name, handler) {
    this.emitter.on(name, handler);
  }
}