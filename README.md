# fullSlider
全屏触摸滚动插件

# 提示
此插件需要node工具构建

# Usage

## html应该要长这样

不可缺少的 sectionWrap 包住所有的单屏；单屏以类 section 标识，且推荐用类似自增的 data-id 标识一下唯一性；单屏内的元素用 data-type="animation" 来标识为会运动的元素。

arrow 可选，它是一个箭头base64图片数据，用于在页面底部生成一个循环运动的箭头，提示用户去滑动屏幕。

```html
  <!DOCTYPE html>
  <html>
  <head>
    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1"> 
    <meta name="charset" content="utf-8">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <title>fullSlider</title>
    <script type="text/javascript" src="js/main.js"></script>
  </head>
  <body>
    <div class="sectionWrap" id="sectionWrap">
      <div class="section" data-id="0">
        <img data-type="animation" src="images/1-1.png">
        <img data-type="animation" src="images/1-2.png">
        <img data-type="animation" src="images/1-3.png">
      </div>
      <div class="section" data-id="1">
        <img data-type="animation" src="images/2-1.png">
        <img data-type="animation" src="images/2-2.png">
        <img data-type="animation" src="images/2-3.png">
        <img data-type="animation" src="images/2-4.png">
      </div>
      <div class="section" data-id="2">
        <img data-type="animation" src="images/3-1.png">
        <img data-type="animation" src="images/3-2.png">
        <img data-type="animation" src="images/3-3.png">
        <img data-type="animation" src="images/3-4.png">
      </div>
    </div>
    <div id="arrow">
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAkCAMAAADB/PhjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAV9QTFRF////jZGZ/f39jpOa/Pz9+/v77e7vk5ee+fn5+/z8kZWdn6Kpl5ui6+ztx8nN2NnckZWcz9HUo6etoqas7/DxxsjMkpad+Pj5vsDFmZ2klJif/v7++vr64eLkjpKanaGn9PT1wcTIxcfLj5SbjZKZ6OnrvL/Dq6609vb3oaWrlZmglZqhur3Bv8HF3t/hzc/S4uTls7e84+Tm2drdo6at7u/wmJyjys3Qr7O4pqqwycvPmp6lmp6klpuhubzByszP8/T19/f4qKyxkJWctbi98vLz6urstri9vL7D19jb09TX8vP06uvs5OXms7a7srW6l5qhuLvAqa2ynKCmwsTJtLe809XXkJSc5ebol5yi8PHypamu5+jpu77C3t/i8/P0nqKo9fb25OXnrbG23N3gxMbKt7m+wMPH6errnqGo1tfa9PX1zdDT1dfZ0dLV0NHVyMrO2dverrG20dPW////3mPCXAAAAHV0Uk5T//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8Am7De6gAAAYZJREFUeNqk1GVzwkAQgOFdghSnxWkpLoW6u7u7u7ve/5+SNg2RTWin+4HM5Z5h3gk5gFED/JAbmpr0oK0p/38OoO1BT6s96GqV1+LG33FBmb1B0gOprZ24TOYAGT6LKaymPMnf8G464slU4sL+fmTilnVgrErtgXgoB/hSWmVxS50D6vAmXOGX1hoiX80v6zeCX2ufZSejzYWdqULqULjjxlNlPii0oQ9bxG/IYpsiBxThm9hbzivlP8u9gh/XD4xJnlWXxbZIceHe6Cq3K/vd3GiX5YMsfB37Fa/cEU5Kc0AansR35fts8uKHxEt5lOs+Ux0us8XmlHNhFd/jWomDPof2OtGDqGtz6CL/oxpxRswBMfwVcwaSmxpwvnx2hesS53hg9JgDHqeC58PpKNOae0n+d/gFXjHtGcbrH97Of/bguEGHl/K3eXYOrOD3nSS54gLTG3PA9piPjwwCs2Bp0s1Mf554hUPAQvw1wSrNGs9ugBn9sbDLUJGbQkVHwgjsT/MpwAAKyO+55uSG7wAAAABJRU5ErkJggg==">
    </div>  
  </body>
  </html>
```

## main.js

引入 FullSlider 类，并实例化

实例化时传入一个配置对象

targetCallback 为到目标屏时执行的回调函数

afterCallback 为离开目标屏时执行的回调函数

之后以 `start()` 方法启动

```js
const FullSlider = require('./FullSlider')
const fullSlider = new FullSlider({
  targetCallback: [t0, t1, t2, t3, t4, t5, t6],
  afterCallback: [a0, a1, a2, a3, a4, a5, a6],
})
fullSlider.start() 
```

## main.css 

引入 FullSlider.scss
