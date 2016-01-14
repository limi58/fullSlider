

class FullSlider 
{

  constructor()
  {
    this.$sectionWrap = document.querySelector('#sectionWrap')
    this.$debug = document.querySelector('#debug')
    this.windowHeight = document.body.clientHeight
    this.totalPage = document.querySelectorAll('#sectionWrap .section').length

    this.startY = null
    this.endY = null
    this.currentPage = 0
    this.currentTranslateY = 0

    document.addEventListener('touchstart', (e)=>{
      e.preventDefault()
      this.onTouchstart(e)
      document.addEventListener('touchmove', this.onTouchmove)
    })

    document.addEventListener('touchend', (e)=>{
      e.preventDefault()
      document.removeEventListener('touchmove', this.onTouchmove)
      this.onTouchend(e)
    })

    this.$sectionWrap.attr = function(key, value){
      this.$sectionWrap.setAttribute(key, value)
    }
  }



  translateYAnimate(num)
  {
    this.$sectionWrap.attr('style', `transition: all 0.4s ease-in; transform: translate3d(0, ${num}px, 0); -webkit-transition: all 0.4s ease-in; -webkit-transform: translate3d(0, ${num}px, 0)`)
  }

  translateY(num)
  {
    this.$sectionWrap.attr('style', `transform: translate3d(0, ${num}px, 0); -webkit-transform: translate3d(0, ${num}px, 0)`)
  }

  onTouchstart(e)
  {
    this.startY = e.changedTouches[0].screenY
  }

  onTouchend(e)
  {
    // 计算currentPage
    this.setCurrentPage(e)
    // 
    this.currentTranslateY = this.currentPage * this.windowHeight * -1

    this.translateYAnimate(this.currentPage * this.windowHeight * -1)
  }

  onTouchmove(e)
  {
    e.preventDefault()
    // 第0屏的时候禁止向上滑动
    if(this.currentPage === 0 && e.changedTouches[0].screenY - this.startY > 0) return
    if(this.currentPage + 1 === this.totalPage && e.changedTouches[0].screenY - this.startY < 0) return

    this.translateY(e.changedTouches[0].screenY - this.startY + this.currentTranslateY)
  }

  setCurrentPage(e)
  {
    if(e.changedTouches[0].screenY === this.startY) return
    if(this.currentPage === 0 && e.changedTouches[0].screenY - this.startY > 0) return
    if(this.currentPage +1 === this.totalPage && e.changedTouches[0].screenY - this.startY < 0) return

    if(e.changedTouches[0].screenY > this.startY){
      this.currentPage --
    }else{
      this.currentPage ++
    }
  }

  dump(text)
  {
    // return
    // $debug.text(text)
    console.log(text)
  }
}

// class Haha
// {
//   constructor()
//   {
//     console.log('con')
//     this.fun()
//   }

//   fun(){
//     console.log('fun')
//     this.fun2()
//   }

//   fun2(){
//     console.log('fun2')
//   }
// }

document.addEventListener('DOMContentLoaded', ()=>{
  const fullSlider = new FullSlider()
  // const haha = new Haha()
})

// function main(){

//   const $sectionWrap = document.querySelector('#sectionWrap')
//   const $debug = document.querySelector('#debug')
//   const windowHeight = document.body.clientHeight
//   const totalPage = document.querySelectorAll('#sectionWrap .section').length

//   let startY = null
//   let endY = null
//   let currentPage = 0
//   let currentTranslateY = 0

//   document.addEventListener('touchstart', function(e){
//     e.preventDefault()
//     onTouchstart(e)
//     document.addEventListener('touchmove', onTouchmove)
//   })

//   document.addEventListener('touchend', function(e){
//     e.preventDefault()
//     document.removeEventListener('touchmove', onTouchmove)
//     onTouchend(e)
//   })

//   $sectionWrap.attr = function(key, value){
//     $sectionWrap.setAttribute(key, value)
//   }

//   function translateYAnimate(num){
//     $sectionWrap.attr('style', `transition: all 0.4s ease-in; transform: translate3d(0, ${num}px, 0); -webkit-transition: all 0.4s ease-in; -webkit-transform: translate3d(0, ${num}px, 0)`)
//   }

//   function translateY(num){
//     $sectionWrap.attr('style', `transform: translate3d(0, ${num}px, 0); -webkit-transform: translate3d(0, ${num}px, 0)`)
//   }

//   function onTouchstart(e){
//     startY = e.changedTouches[0].screenY
//   }

//   function onTouchend(e){
//     // 计算currentPage
//     setCurrentPage(e)
//     // 
//     currentTranslateY = currentPage * windowHeight * -1

//     translateYAnimate(currentPage * windowHeight * -1)
//   }

//   function onTouchmove(e){
//     e.preventDefault()
//     // 第0屏的时候禁止向上滑动
//     if(currentPage === 0 && e.changedTouches[0].screenY - startY > 0) return
//     if(currentPage + 1 === totalPage && e.changedTouches[0].screenY - startY < 0) return

//     translateY(e.changedTouches[0].screenY - startY + currentTranslateY)
//     // console.log(e.changedTouches[0].screenY - startY)
//   }

//   function setCurrentPage(e){
//     if(e.changedTouches[0].screenY === startY) return
//     if(currentPage === 0 && e.changedTouches[0].screenY - startY > 0) return
//     if(currentPage +1 === totalPage && e.changedTouches[0].screenY - startY < 0) return

//     if(e.changedTouches[0].screenY > startY){
//       currentPage --
//     }else{
//       currentPage ++
//     }
//   }

//   function dump(text){return
//     $debug.text(text)
//   }

  
  
// }