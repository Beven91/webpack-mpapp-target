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
    const callback = jest.fn();

    const mockCompiler = new MockCompiler();
    const compiler = new AppCompiler(mockCompiler, { target: 'bytedance' });

    const adapter = new PlatformAdapter(complilation, callback, compiler);

    // 匹配complilation镜像
    expect(complilation).toMatchSnapshot();

    // 断言:callback 必须校验
    expect(callback).toHaveBeenCalled();
  });
});
