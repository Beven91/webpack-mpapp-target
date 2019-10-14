const Compiler = require('webpack/lib/Compiler')
const AppCompiler = require('./AppCompiler');

module.exports = function (mayCompiler) {
  if (mayCompiler instanceof Compiler) {
    return new AppCompiler(mayCompiler, {});
  }
  return (compiler) => new AppCompiler(compiler, mayCompiler);
};