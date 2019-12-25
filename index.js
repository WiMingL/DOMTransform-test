function DOMTransform(){
  //变量参数
  this.translateY = 0;
  this.translateX = 0;
  this.opHeight = 0;
  this.opWidth = 0;
  this.operator = null;
  this.scale = 1;
  this.wrapper = null;
  this.size = 0;
  this.scaleMin = 0.3;
  this.scaleMax = 3;
  this.banTranslate = false;
  this.banZoom = false;
  //方法
  //判断是否元素
  this.judgeElement = (el) => {
    let reg = /HTML([\d\D]*)Element/
    let type = Object.prototype.toString.call(el);
    return reg.test(type);
  }
  //设置操作内容
  this.setOperator = (el) => {
    if (this.judgeElement(el)) {
      this.operator = el
      this.opHeight = el.offsetHeight
      this.opWidth = el.offsetWidth
      return true
    }
    return false
  }
  //设置操作容器
  this.setWrapper = (el) => {
    if (this.judgeElement(el)) {
      this.wrapper = el
      return true
    }
    console.error('the parameter passed in is not a HTML element')
    return false
  }
  //设置过渡效果
  this.setTransition = (content) => {
    if (this.operator) {
      this.operator.style.transition = `${content}`
      return true
    }
    console.error('please set up operator first')
    return false
  }
  this.setTranslate = (x, y, isrender = false) => {
    if (this.operator) {
      if (x != null && y != null) {
        this.translateX = Number(x.toFixed(4))
        this.translateY = Number(y.toFixed(4))
        if (isrender) {
          this.render()
        }
        return true
      }
      console.log(x + '--' + y)
      console.error('XY parameter is required')
    } else {
      console.error('please set up operator first')
    }
    return false
  }
  this.allowTranslate = () => {
    let elem = this.operator
    if (elem) {
      let isdown = false
      //记录初始位置
      let pos_x_f = 0
      let pos_y_f = 0
      //记录初始位移
      let trans_x_f = 0
      let trans_y_f = 0
      elem.addEventListener('mousedown', (e) => {
        if(!this.banTranslate){
          e.preventDefault()
          trans_x_f = this.translateX
          trans_y_f = this.translateY
          isdown = true
          pos_x_f = e.pageX
          pos_y_f = e.pageY
        }
        
      })
      elem.addEventListener('mousemove', (e) => {
        if (isdown) {
          let move_x = trans_x_f + e.pageX - pos_x_f
          let move_y = trans_y_f + e.pageY - pos_y_f
          this.setTranslate(move_x, move_y, true)
        }
      })
      elem.addEventListener('mouseup', () => {
        isdown = false
      })
      elem.addEventListener('mouseleave', () => {
        isdown = false
      })
      return true
    }
    return false

  }
  this.allowZoom = (size) => {
    let elem = this.operator

    if (elem) {
      this.size = size || 10
      elem.style.transformOrigin = '0 0'
      elem.addEventListener('wheel', (e) => {
        if(!this.banZoom){
          let scale_size = this.size / this.opWidth * this.scale

          e.deltaY > 0 ? scale_size *= -1 : '';
          //记录鼠标相对operator初始位置
          let pos_x = e.offsetX
          let pos_y = e.offsetY

          //计算偏移位置
          let deviation_x = pos_x * scale_size
          let deviation_y = pos_y * scale_size


          //设置新的属性
          let scale = this.scale + scale_size
          if(scale >= this.scaleMin && scale <= this.scaleMax){
            this.scale = scale
            this.translateX -= deviation_x
            this.translateY -= deviation_y
            this.setTranslate(this.translateX, this.translateY, true)
          }
        }
      })
      return true
    }
    return false
  }
  //限制缩放倍数
  this.limitScaleSize = (min, max) => {
    if (min != null & max != null) {
      this.scaleMin = min
      this.scaleMax = max
    }
  }
  //operator渲染
  this.render = () => {
    if (this.operator) {
      this.operator.style.transform = `
        translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})
      `
      return true
    }
    console.error('please set up operator first')
    return false
  }
}

const dt = new DOMTransform()