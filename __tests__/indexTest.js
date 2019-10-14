/**
 * @module Index
 * @name 测试 index.js
 * @description
 */
import MockCompiler from 'webpack/lib/Compiler';
import AppCompiler from '../src/AppCompiler';
import index from '../src/index';

describe('index', () => {
  it('index.compiler', () => {
    const compiler = new MockCompiler();

    const result = index(compiler);

    // 断言：如果传入的时compiler则表示，不进行配置，使用默认，此时应该走默认分支 
    expect(result instanceof AppCompiler).toBe(true);
  });

  it('index.config', () => {
    const mockCompiler = new MockCompiler();
    const result = index({
      from: 'wx',
      target: 'alipay'
    });

    // 断言：如果时进行配置，则返回一个函数
    const compiler = result(mockCompiler);
    expect(compiler instanceof AppCompiler).toBe(true);
  });


});
