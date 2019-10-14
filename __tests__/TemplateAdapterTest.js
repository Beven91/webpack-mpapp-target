/**
 * @module TemplateAdapter
 * @name 测试 TemplateAdapter模块
 * @description
 */

import TemplateAdapter from '../src/adapters/TemplateAdapter';
import platforms from '../src/platforms';

describe('TemplateAdapter', () => {
  test('apply.bytedance', () => {

    // 创建一个从微信小安程序  转换到 字节跳动小程序的适配器
    const adapter = new TemplateAdapter(platforms.wx, platforms.bytedance);

    const asset = {
      source: () => {
        return `
        <view>
          <template src="a/b/c.wxml"/>
          <template src="a/b/c.wxml/>
          <view>111</view>
          <template src='c/d/e.wxml'></template><template src="c/d/hello.wxml"></template>
        </view>
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
