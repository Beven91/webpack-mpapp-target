module.exports = {
  assets: {
    'a/b/c.wxss': {
      source: () => {
        return `
         @import "a/b/c.wxss" @import 'b/c/d.wxss'
        .a{
          color:red;
        }
        @import 'c/d/e.wxss'
        `;
      },
      size() {
        return this.source().length;
      }
    },
    'a/d/hello.ttss': {
      source: () => {
        return `
         @import "a/b/c.ttss"
        .a{
          color:red;
        }
        `;
      },
      size() {
        return this.source().length;
      }
    },
    'a/b/c.wxml': {
      source: () => {
        return `
        <view>
          <template src="a/b/c.wxml"/>
          <view>111</view>
          <template src='c/d/e.wxml'></template><template src="c/d/hello.wxml"></template>
        </view>
        `
      },
      size() {
        return this.source().length;
      }
    }
  }
}