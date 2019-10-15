const path = require('path');
const CssAdapter = require('./adapters/CssAdapter');
const TemplateAdapter = require('./adapters/TemplateAdapter');

module.exports = class PlatformAdapter {
  constructor(compilation, context) {
    this.compilation = compilation;
    this.compiler = context.compiler;
    this.from = context.fromPlatform;
    this.target = context.targetPlatform;
    this.adapters = [
      new CssAdapter(this.from, this.target),
      new TemplateAdapter(this.from, this.target)
    ]
  }

  transform() {
    const compilation = this.compilation;
    const allAssets = compilation.assets;
    const assetKeys = Object.keys(allAssets);
    assetKeys
      .forEach((assetKey) => {
        const info = path.parse(assetKey);
        const ext = info.ext;
        const basename = path.join(info.root, info.dir, info.name).replace(/\\/g, '/');
        const asset = compilation.assets[assetKey];
        const adapter = this.adapters.find((adapter) => adapter.fromExt === ext);
        if (adapter) {
          const newAssetKey = basename + adapter.targetExt;
          // 处理asset
          adapter.apply(asset);
          // 删除原有的asset
          delete compilation.assets[assetKey];
          // 重新设置asset
          compilation.assets[newAssetKey] = asset;
        }
      });
  }
}