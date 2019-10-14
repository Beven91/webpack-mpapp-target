/**
 * @module AppCompiler
 * @name 测试 AppCompiler模块
 * @description
 */

import AppCompiler from '../src/AppCompiler';
import MockCompiler from 'webpack/lib/Compiler';
import DefinePlugin from 'webpack/lib/DefinePlugin';
import platforms from '../src/platforms';

describe('AppCompiler', () => {
  it('constructor', () => {
    const mockCompiler = new MockCompiler();
    const compiler = new AppCompiler(mockCompiler, { target: 'bytedance' })
    // 断言: 默认from为微信小程序
    expect(compiler.fromPlatform).toBe(platforms.wx);
    // 断言: 目标平台为 字节跳动小程序
    expect(compiler.targetPlatform).toBe(platforms.bytedance);
    // 断言: 当前变量值匹配镜像
    expect(compiler.variables()).toMatchSnapshot();

    // 创建指定类型的来源
    const compiler2 = new AppCompiler(mockCompiler, { from: 'alipay', target: 'wx' });
    // 断言: 默认from为微信小程序
    expect(compiler2.fromPlatform).toBe(platforms.alipay);
    // 断言: 目标平台为 字节跳动小程序
    expect(compiler2.targetPlatform).toBe(platforms.wx);
  });

  it('validate', () => {
    const mockCompiler = new MockCompiler();
    try {
      const compiler = new AppCompiler(mockCompiler, { from: 'xx' });
    } catch (ex) {
      expect(ex.message).toContain('不支持的原代码类型from');
    }
    try {
      new AppCompiler(mockCompiler, { target: 'xx' });
    } catch (ex) {
      expect(ex.message).toContain('不支持的目标类型target');
    }

    // 测试来源平台与目标平台一致，时不会进行任何处理
    const fn = jest.spyOn(AppCompiler.prototype, 'initialize')
    const compiler = new AppCompiler(mockCompiler, { from: 'wx', target: 'wx' });
    // 断言:在同一个平台下，不进行任何处理即 initialize不会被调用
    expect(fn).not.toHaveBeenCalled();

    // 取消监听
    fn.mockRestore();
  })

  it('initialize', () => {
    const mockCompiler = new MockCompiler();
    const spyInitialize = jest.spyOn(AppCompiler.prototype, 'initialize')
    const compiler = new AppCompiler(mockCompiler, { from: 'wx', target: 'alipay' });

    // 断言： initialize被调用
    expect(spyInitialize).toHaveBeenCalled();
    // 断言：使用了插件 DefinePlugin,且其配置，匹配镜像
    const definePlugin = mockCompiler._plugins.find((f) => f instanceof DefinePlugin);
    expect(definePlugin.variables).toMatchSnapshot();

    // 执行emit
    mockCompiler.emitAssets();
  })
});
