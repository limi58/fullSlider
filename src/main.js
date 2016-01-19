const FullSlider = require('./FullSlider')
const $ = (sele) => document.querySelector(sele)
const $$ = (sele) => document.querySelectorAll(sele)

function startAnimate(page, animations){
  const animationElements = $$(`[data-id="${page}"] [data-type="animation"]`)
  for(let i = 0; i < animationElements.length; i++){
    animationElements[i].style.animation = animationElements[i].style.webkitAnimation = `${animations[i].name} ${animations[i].duration} ease ${animations[i].delay} ${animations[i].count} ${animations[i].direction} both`
  }
}

function endAnimate(page){
  const animationElements = $$(`[data-id="${page}"] [data-type="animation"]`)
  for(let i = 0; i < animationElements.length; i++){
    animationElements[i].style.animation = animationElements[i].style.webkitAnimation = 'none'
  }
}

window.addEventListener('load', ()=>{
  t0()
  const fullSlider = new FullSlider({
    targetCallback: [t0, t1, t2, t3, t4, t5, t6],
    afterCallback: [a0, a1, a2, a3, a4, a5, a6],
  })
  function t0(){
    startAnimate('0', [
      {name: 'puffIn', duration: '1s', delay: '0.5s', count: '1', direction: 'alternate'},
      {name: 'puffIn', duration: '1s', delay: '1s', count: '1', direction: 'alternate'},
      {name: 'fadeInUp', duration: '2s', delay: '1.3s', count: '1', direction: 'alternate'},
    ])
  }
  function t1(){
    startAnimate('1', [
      {name: 'puffIn2-1', duration: '1s', delay: '0.5s', count: '1', direction: 'alternate'},
      {name: 'puffIn2-2', duration: '1s', delay: '0.5s', count: '1', direction: 'alternate'},
      {name: 'fadeInRight', duration: '1s', delay: '0.8s', count: '1', direction: 'alternate'},
      {name: 'fadeInLeft', duration: '1s', delay: '1.1s', count: '1', direction: 'alternate'},
    ])
  }
  function t2(){
    startAnimate('2', [
      {name: 'puffIn2-1', duration: '1s', delay: '0.5s', count: '1', direction: 'alternate'},
      {name: 'puffIn2-2', duration: '1s', delay: '0.5s', count: '1', direction: 'alternate'},
      {name: 'fadeInRight', duration: '1s', delay: '0.8s', count: '1', direction: 'alternate'},
      {name: 'fadeInLeft', duration: '1s', delay: '1.1s', count: '1', direction: 'alternate'},
    ])
  }
  function t3(){
    startAnimate('3', [
      {name: 'fadeInLeft', duration: '1s', delay: '0.5s', count: '1', direction: 'alternate'},
      {name: 'fadeIn', duration: '1s', delay: '1.5s', count: '1', direction: 'alternate'},
      {name: 'fadeInRight', duration: '1s', delay: '2s', count: '1', direction: 'alternate'},
      {name: 'fadeIn', duration: '1s', delay: '3s', count: '1', direction: 'alternate'},
      {name: 'fadeInLeft', duration: '1s', delay: '3.5s', count: '1', direction: 'alternate'},
      {name: 'fadeIn', duration: '1s', delay: '4.5s', count: '1', direction: 'alternate'},
      {name: 'fadeInRight', duration: '1s', delay: '5s', count: '1', direction: 'alternate'},
      {name: 'fadeIn', duration: '1s', delay: '6s', count: '1', direction: 'alternate'},
    ])
  }
  function t4(){
    startAnimate('4', [
      {name: 'fadeInLeft', duration: '1s', delay: '0.5s', count: '1', direction: 'alternate'},
      {name: 'fadeIn', duration: '1s', delay: '1.5s', count: '1', direction: 'alternate'},
      {name: 'fadeInRight', duration: '1s', delay: '2s', count: '1', direction: 'alternate'},
      {name: 'fadeIn', duration: '1s', delay: '3s', count: '1', direction: 'alternate'},
      {name: 'fadeInLeft', duration: '1s', delay: '3.5s', count: '1', direction: 'alternate'},
      {name: 'fadeIn', duration: '1s', delay: '4.5s', count: '1', direction: 'alternate'},
      {name: 'fadeInRight', duration: '1s', delay: '5s', count: '1', direction: 'alternate'},
      {name: 'fadeIn', duration: '1s', delay: '6s', count: '1', direction: 'alternate'},
    ])
  }
  function t5(){
    startAnimate('5', [
      {name: 'fadeInLeft', duration: '1s', delay: '0.5s', count: '1', direction: 'alternate'},
      {name: 'fadeInRight', duration: '1s', delay: '0.5s', count: '1', direction: 'alternate'},
      {name: 'fadeInLeft', duration: '1s', delay: '1.5s', count: '1', direction: 'alternate'},
      {name: 'fadeInRight', duration: '1s', delay: '1.5s', count: '1', direction: 'alternate'},
      {name: 'fadeInLeft', duration: '1s', delay: '2.5s', count: '1', direction: 'alternate'},
      {name: 'fadeInRight', duration: '1s', delay: '2.5s', count: '1', direction: 'alternate'},
    ])
  }
  function t6(){
    startAnimate('6', [
      {name: 'bounceInLeft', duration: '1s', delay: '0.5s', count: '1', direction: 'alternate'},
      {name: 'bounceInLeft', duration: '1s', delay: '1s', count: '1', direction: 'alternate'},
      {name: 'bounceInLeft', duration: '1s', delay: '1.5s', count: '1', direction: 'alternate'},
      {name: 'bounceInLeft', duration: '1s', delay: '2s', count: '1', direction: 'alternate'},
      {name: 'bounceInLeft', duration: '1s', delay: '2.5s', count: '1', direction: 'alternate'},
      {name: 'bounceInLeft', duration: '1s', delay: '3s', count: '1', direction: 'alternate'},
    ])
  }
  function a0(){
    endAnimate('0')
  }
  function a1(){
    endAnimate('1')
  }
  function a2(){
    endAnimate('2')
  }
  function a3(){
    endAnimate('3')
  }
  function a4(){
    endAnimate('4')
  }
  function a5(){
    endAnimate('5')
  }
  function a6(){
    endAnimate('6')
  }
  fullSlider.start() 
})