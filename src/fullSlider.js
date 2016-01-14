$(function(){ 

  var $sectionWrap = $('#sectionWrap')

  var windowHeight = $(window).height()
  var startY = null
  var endY = null
  var currentPage = 0
  var totalPage = $sectionWrap.find('.section').length
  var currentTranslateY = 0

  document.addEventListener('touchstart', function(e){
    e.preventDefault()
    onTouchstart(e)
    document.addEventListener('touchmove', onTouchmove)
  })

  document.addEventListener('touchend', function(e){
    e.preventDefault()
    document.removeEventListener('touchmove', onTouchmove)
    onTouchend(e)
  })

  function translateYAnimate(num){
    $sectionWrap.attr('style', 'transition: all 0.4s ease-in; transform: translate3d(0, ' + num + 'px, 0); -webkit-transition: all 0.4s ease-in; -webkit-transform: translate3d(0, ' + num + 'px, 0)')
  }

  function translateY(num){
    $sectionWrap.attr('style', 'transform: translate3d(0, ' + num + 'px, 0)')
  }

  function onTouchstart(e){
    startY = e.changedTouches[0].screenY
  }

  function onTouchend(e){
    // 计算currentPage
    setCurrentPage(e)
    // 
    currentTranslateY = currentPage * windowHeight * -1

    translateYAnimate(currentPage * windowHeight * -1)
  }

  function onTouchmove(e){
    e.preventDefault()
    // 第0屏的时候禁止向上滑动
    if(currentPage === 0 && e.changedTouches[0].screenY - startY > 0) return
    if(currentPage + 1 === totalPage && e.changedTouches[0].screenY - startY < 0) return

    translateY(e.changedTouches[0].screenY - startY + currentTranslateY)
    // console.log(e.changedTouches[0].screenY - startY)
  }

  function setCurrentPage(e){
    if(e.changedTouches[0].screenY === startY) return
    if(currentPage === 0 && e.changedTouches[0].screenY - startY > 0) return
    if(currentPage +1 === totalPage && e.changedTouches[0].screenY - startY < 0) return

    if(e.changedTouches[0].screenY > startY){
      currentPage --
    }else{
      currentPage ++
    }
  }

  
  
})