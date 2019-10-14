module.exports = class CssAdapter {
  constructor(from, target) {
    this.from = from;
    this.target = target;
    this.fromExt = from.template;
    this.targetExt = target.template;
    this.replaceRegex = new RegExp('src=.+?' + this.fromExt.replace('.', '\.') + '(\'|")', 'ig');
  }

  apply(asset) {
    let source = String(asset.source());
    // 处理@import 值类的后缀名
    source = source.replace(this.replaceRegex, (a, b) => {
      return a.replace(this.fromExt + b, this.targetExt + b);
    });
    asset.source = () => source;
    asset.size = () => source.length;
  }
}