# DOMTransform
这是一个轻量级的原生图片缩放函数，他可以很方便的使你的图片具备鼠标拖动，滚轮缩放的功能

# 使用
## 引入代码
  因为这不是一个封装的模块，所以你需要拷贝这段代码到你的项目中。

## 实例化DOMTransform
  你需要实例化一个DT对象
    ```javascript
    const DT = new DOMTransform()
    ```

## 设置目标元素
  调用setOperator来你需要设置被操作的dom元素-elem
  ```javascript
  DT.setOperator(elem)
  ```

## 允许拖动
  调用allowTranslate函数来允许元素可拖动，如果你不需要这个功能，你可以不执行该函数
  ```javascript
  DT.allowTranslate()
  ```
  若你开启后希望可以禁止该功能，你可以设置他的banTranslate属性为true
  ```javascript
  DT.banTranslate=true
  ```

## 允许缩放
  调用allowZoom函数可以允许元素可缩放,你可以传入size参数来设置每次缩放前后的元素宽的差的大小，默认为10px（即：放大后的元素宽-放大前的元素宽=10）
  ```javascript
  DT.allowZoom(size)
  ```
  同理，若你开启后希望可以禁止该功能，你可以设置他的banZoom属性为true
   ```javascript
  DT.banZoom=true
  ```

## 限制缩放的倍数
  对于缩放的倍数，默认是max=3，min=0.3
  如果你希望重新设置，你可以调用limitScaleSize方法
   ```javascript
  DT.limitScaleSize(min,max)
  //or
  DT.scaleMin = 1
  DT.scaleMax = 3
  ```

## 自定义设置tranlate属性
  如果你希望可以自定义设置目标元素的translate属性，你可以调用setTranslate方法
   ```javascript
  DT.setTranslate(x,y,isRender)
  ```
  x是translateX，不能为空
  y是translateY，不能为空
  isRender是指是否在设置完translate后自动渲染，true：渲染/false：不渲染，默认是false

## 设置过渡属性
  如果你希望在渲染的时候有一定过渡效果，你可以调用setTransition方法
   ```javascript
  DT.setTransition(content)
  ```
  content是你需要设置的transition属性，和css3写法相同
  如：
   ```javascript
  DT.setTransition('transform 0.1s')
  ```