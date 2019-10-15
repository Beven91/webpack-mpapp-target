/**
 * @module PlatformAdapterTest
 * @name 测试 PlatformAdapterTest模块
 * @description
 */
import AppCompiler from '../src/AppCompiler';
import MockCompiler from 'webpack/lib/Compiler';
import PlatformAdapter from '../src/PlatformAdapter';
import complilation from '../__mocks__/complication';


describe('PlatformAdapter', () => {
  test('apply', () => {
    const mockCompiler = new MockCompiler();
    const compiler = new AppCompiler(mockCompiler, { target: 'bytedance' });

    const adapter = new PlatformAdapter(complilation, compiler);

    adapter.transform();

    const obj = Object.keys(complilation.assets).reduce((map, k) => {
      const asset = complilation.assets[k];
      map[k] = {
        source: asset.source(),
        size: asset.size(),
      }
      return map;
    }, {})
    // 匹配complilation镜像
    expect(obj).toMatchSnapshot();
  });
});
