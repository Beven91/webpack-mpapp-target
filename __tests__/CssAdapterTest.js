/**
 * @module CssAdapter
 * @name 测试 CssAdapter模块
 * @description
 */

import CssAdapter from '../src/adapters/CssAdapter';
import platforms from '../src/platforms';

describe('CssAdapter', () => {
  test('apply.bytedance', () => {

    // 创建一个从微信小安程序  转换到 字节跳动小程序的适配器
    const adapter = new CssAdapter(platforms.wx, platforms.bytedance);

    const asset = {
      source: () => {
        return `
      @import "a/b/c.wxss" @import 'b/c/d.wxss'
      .a{
        color:red;
      }
      @import 'c/d/e.wxss'
    `
      }
    }

    // 执行转换处理
    adapter.apply(asset);
    // 断言: 匹配转换镜像
    expect(asset.source()).toMatchSnapshot();
    // 断言: 长度匹配
    expect(asset.size()).toMatchSnapshot();
  });
});
