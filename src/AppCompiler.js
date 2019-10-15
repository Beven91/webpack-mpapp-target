const DefinePlugin = require("webpack/lib/DefinePlugin");
const PlatformAdapter = require('./PlatformAdapter');
const platforms = require('./platforms');

module.exports = class MpAppCompiler {
  constructor(compiler, options) {
    this.compiler = compiler;
    this.options = {
      from: options.from || 'wx',
      target: options.target || 'wx',
    }
    // 原代码平台类型
    this.fromPlatform = platforms[this.options.from];
    // 编译的目标平台
    this.targetPlatform = platforms[this.options.target];
    // 校验参数
    if (this.validate()) {
      // 初始化
      this.initialize();
    }
  }

  // 获取全局变量名转换配置
  variables() {
    const defines = {};
    // 这里将来源的全局变量 同意替换成目标的全局变量 ，例如: wx ---> tt
    defines[this.fromPlatform.global] = this.targetPlatform.global;
    return defines;
  }

  initialize() {
    const compiler = this.compiler;
    compiler.plugin('emit', (compilation, callback) => {
      const adapter = new PlatformAdapter(compilation, this);
      adapter.transform();
      callback();
    });
    compiler.apply(
      // 将全局变量进行重命名
      new DefinePlugin(this.variables())
    )
  }

  validate() {
    const platformsKeys = Object.keys(platforms).join(',')
    if (!this.fromPlatform) {
      throw new Error(`不支持的原代码类型from:${this.options.from},\n仅支持以下类型\n:${platformsKeys}`);
    } else if (!this.targetPlatform) {
      throw new Error(`不支持的目标类型target:${this.options.target},\n仅支持以下类型\n:${platformsKeys}`);
    }
    return (this.fromPlatform !== this.targetPlatform);
  }
}