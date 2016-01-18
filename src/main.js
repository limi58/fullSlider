const FullSlider = require('./FullSlider')
const $ = (sele) => document.querySelector(sele)
const $$ = (sele) => document.querySelectorAll(sele)

function startAnimate(page, animations){
  const animationElements = $$(`[data-id="${page}"] [data-type="animation"]`)
  for(let i = 0; i < animationElements.length; i++){
    animationElements[i].style.animation = `${animations[i].name} ${animations[i].duration} ease ${animations[i].delay} ${animations[i].count} ${animations[i].direction} both`
  }
}

function endAnimate(page){
  const animationElements = $$(`[data-id="${page}"] [data-type="animation"]`)
  for(let i = 0; i < animationElements.length; i++){
    animationElements[i].style.animation = 'none'
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  t1()
  const fullSlider = new FullSlider({
    targetCallback: [t1],
    afterCallback: [a],
  })
  function t1(){
    startAnimate('0', [
      {name: 'puffIn', duration: '1s', delay: '0.5s', count: '1', direction: 'alternate'},
      {name: 'puffIn', duration: '1s', delay: '1s', count: '1', direction: 'alternate'},
      {name: 'fadeInUp', duration: '2s', delay: '1.3s', count: '1', direction: 'alternate'},
    ])
  }
  function a(){
    endAnimate('0')
  }
  fullSlider.start() 
})