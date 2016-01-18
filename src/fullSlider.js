/**
 * fullSlider v1.1.0
 * author - limi58
 * github - https://github.com/limi58/fullSlider
 */

class FullSlider 
{
  constructor(config = {})
  {
    this.$sectionWrap = document.querySelector('#sectionWrap')
    this.$debug = document.querySelector('#debug')
    this.windowHeight = document.body.clientHeight
    this.totalPage = document.querySelectorAll('#sectionWrap .section').length

    this.startY = null
    this.endY = null
    this.currentPage = 0
    this.previousPage = 0
    this.currentTranslateY = 0

    // config
    this.duration = config.duration || 0.4
    this.targetCallback = config.targetCallback
    this.afterCallback = config.afterCallback
  }

  start()
  {
    document.addEventListener('touchstart', (e)=>{
      this.onTouchstart(e)
      document.addEventListener('touchmove', this.onTouchmove.bind(this))
    })

    document.addEventListener('touchend', (e)=>{
      document.removeEventListener('touchmove', this.onTouchmove)
      this.onTouchend(e)
    })

    document.addEventListener('transitionend', this.onTransitionend.bind(this))
  }


  /**
   * 屏幕动画到指定Y
   */
  translateYAnimate(num)
  {
    const duration = this.duration
    this.$sectionWrap.setAttribute('style', `transition: all ${duration}s ease-in; transform: translate3d(0, ${num}px, 0); -webkit-transition: all ${duration}s ease-in; -webkit-transform: translate3d(0, ${num}px, 0)`)
  }

  /**
   * 屏幕到指定Y，无动画，用于跟随手指
   */
  translateY(num)
  {
    this.$sectionWrap.setAttribute('style', `transform: translate3d(0, ${num}px, 0); -webkit-transform: translate3d(0, ${num}px, 0)`)
  }

  /**
   * css动画执行完毕回调
   */
  onTransitionend(e)
  {
    switch(e.target.id)
    {
      case 'sectionWrap':
        this.runPanCallback()
        break
      default:
        break
    }
  }

  /**
   * 滚屏动画停止后执行
   */
  runPanCallback()
  {
    if(this.afterCallback[this.previousPage]){
      this.afterCallback[this.previousPage]()
    }
    if(this.targetCallback[this.currentPage]){
      this.targetCallback[this.currentPage]()
    }
  }

  /**
   * 手指刚刚接触到屏幕执行
   */
  onTouchstart(e)
  {
    this.startY = this.getCurrentY(e)
  }

  /**
   * 手指离开时的回调函数
   */
  onTouchend(e)
  {
    // 计算currentPage
    this.setCurrentPage(e)
    // 设置当前translateY的坐标
    this.currentTranslateY = this.currentPage * this.windowHeight * -1
    // 动画到指定Y
    this.translateYAnimate(this.currentPage * this.windowHeight * -1)
  }

  // 获取当前Y坐标
  getCurrentY(e){
    return e.changedTouches[0].screenY
  }

  /**
   * 滑动事件时的动作
   */
  onTouchmove(e)
  {
    e.preventDefault()
    // 第0屏的时候禁止向下滑动
    if(this.isFirstScreen() && ! this.isPanUp(e)) return
    // 最后一屏时禁止向上滑动
    if(this.isEndScreen() && this.isPanUp(e)) return

    // 跟随手指移动
    this.translateY(this.getPanDistance(e) + this.currentTranslateY)
  }

  /**
   * 获取滑动距离
   */
  getPanDistance(e){
    return this.getCurrentY(e) - this.startY
  }

  /**
   * 是否向上滑动
   */
  isPanUp(e){
    return this.getPanDistance(e) < 0
  }

  /**
   * 是否在第一屏
   */
  isFirstScreen(){
    return this.currentPage === 0
  }

  /**
   * 是否在最后一屏
   */
  isEndScreen(){
    return this.currentPage + 1 === this.totalPage
  }

  /**
   * 设置当前页数和之前页数
   */
  setCurrentPage(e)
  {
    // 当手指未移动时
    if(this.getCurrentY(e) === this.startY) return
    // 当在第一屏且向下滑动
    if(this.currentPage === 0 && ! this.isPanUp(e)) return
    // 当到最后一屏且向上滑动
    if(this.currentPage +1 === this.totalPage && this.isPanUp(e)) {
      this.currentPage = 0
      return
    }

    // 正常情况下的滑动
    this.previousPage = this.currentPage

    if(this.isPanUp(e)){
      this.currentPage ++
    }else{
      this.currentPage --
    }
  }
}

module.exports = FullSlider

