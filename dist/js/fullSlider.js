(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * fullSlider v1.1.0
 * author - limi58
 * github - https://github.com/limi58/fullSlider
 */

var FullSlider = function () {
  function FullSlider() {
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, FullSlider);

    this.$sectionWrap = document.querySelector('#sectionWrap');
    this.$debug = document.querySelector('#debug');
    this.windowHeight = document.body.clientHeight;
    this.totalPage = document.querySelectorAll('#sectionWrap .section').length;

    this.startY = null;
    this.endY = null;
    this.currentPage = 0;
    this.previousPage = 0;
    this.currentTranslateY = 0;

    // config
    this.duration = config.duration || 0.4;
    this.targetCallback = config.targetCallback;
    this.afterCallback = config.afterCallback;
  }

  _createClass(FullSlider, [{
    key: 'start',
    value: function start() {
      var _this = this;

      document.addEventListener('touchstart', function (e) {
        _this.onTouchstart(e);
        document.addEventListener('touchmove', _this.onTouchmove.bind(_this));
      });

      document.addEventListener('touchend', function (e) {
        document.removeEventListener('touchmove', _this.onTouchmove);
        _this.onTouchend(e);
      });

      document.addEventListener('transitionend', this.onTransitionend.bind(this));
    }

    /**
     * 屏幕动画到指定Y
     */

  }, {
    key: 'translateYAnimate',
    value: function translateYAnimate(num) {
      var duration = this.duration;
      this.$sectionWrap.setAttribute('style', 'transition: all ' + duration + 's ease-in; transform: translate3d(0, ' + num + 'px, 0); -webkit-transition: all ' + duration + 's ease-in; -webkit-transform: translate3d(0, ' + num + 'px, 0)');
    }

    /**
     * 屏幕到指定Y，无动画，用于跟随手指
     */

  }, {
    key: 'translateY',
    value: function translateY(num) {
      this.$sectionWrap.setAttribute('style', 'transform: translate3d(0, ' + num + 'px, 0); -webkit-transform: translate3d(0, ' + num + 'px, 0)');
    }

    /**
     * css动画执行完毕回调
     */

  }, {
    key: 'onTransitionend',
    value: function onTransitionend(e) {
      switch (e.target.id) {
        case 'sectionWrap':
          this.runPanCallback();
          break;
        default:
          break;
      }
    }

    /**
     * 滚屏动画停止后执行
     */

  }, {
    key: 'runPanCallback',
    value: function runPanCallback() {
      if (this.afterCallback[this.previousPage]) {
        this.afterCallback[this.previousPage]();
      }
      if (this.targetCallback[this.currentPage]) {
        this.targetCallback[this.currentPage]();
      }
    }

    /**
     * 手指刚刚接触到屏幕执行
     */

  }, {
    key: 'onTouchstart',
    value: function onTouchstart(e) {
      this.startY = this.getCurrentY(e);
    }

    /**
     * 手指离开时的回调函数
     */

  }, {
    key: 'onTouchend',
    value: function onTouchend(e) {
      // 计算currentPage
      this.setCurrentPage(e);
      // 设置当前translateY的坐标
      this.currentTranslateY = this.currentPage * this.windowHeight * -1;
      // 动画到指定Y
      this.translateYAnimate(this.currentPage * this.windowHeight * -1);
    }

    // 获取当前Y坐标

  }, {
    key: 'getCurrentY',
    value: function getCurrentY(e) {
      return e.changedTouches[0].screenY;
    }

    /**
     * 滑动事件时的动作
     */

  }, {
    key: 'onTouchmove',
    value: function onTouchmove(e) {
      e.preventDefault();
      // 第0屏的时候禁止向下滑动
      if (this.isFirstScreen() && !this.isPanUp(e)) return;
      // 最后一屏时禁止向上滑动
      if (this.isEndScreen() && this.isPanUp(e)) return;

      // 跟随手指移动
      this.translateY(this.getPanDistance(e) + this.currentTranslateY);
    }

    /**
     * 获取滑动距离
     */

  }, {
    key: 'getPanDistance',
    value: function getPanDistance(e) {
      return this.getCurrentY(e) - this.startY;
    }

    /**
     * 是否向上滑动
     */

  }, {
    key: 'isPanUp',
    value: function isPanUp(e) {
      return this.getPanDistance(e) < 0;
    }

    /**
     * 是否在第一屏
     */

  }, {
    key: 'isFirstScreen',
    value: function isFirstScreen() {
      return this.currentPage === 0;
    }

    /**
     * 是否在最后一屏
     */

  }, {
    key: 'isEndScreen',
    value: function isEndScreen() {
      return this.currentPage + 1 === this.totalPage;
    }

    /**
     * 设置当前页数和之前页数
     */

  }, {
    key: 'setCurrentPage',
    value: function setCurrentPage(e) {
      // 当手指未移动时
      if (this.getCurrentY(e) === this.startY) return;
      // 当在第一屏且向下滑动
      if (this.currentPage === 0 && !this.isPanUp(e)) return;
      // 当到最后一屏且向上滑动
      if (this.currentPage + 1 === this.totalPage && this.isPanUp(e)) {
        this.currentPage = 0;
        return;
      }

      // 正常情况下的滑动
      this.previousPage = this.currentPage;

      if (this.isPanUp(e)) {
        this.currentPage++;
      } else {
        this.currentPage--;
      }
    }
  }]);

  return FullSlider;
}();

document.addEventListener('DOMContentLoaded', function () {
  var fullSlider = new FullSlider({
    targetCallback: [b],
    afterCallback: [a]
  });
  function b() {
    console.log('1b');
  }
  function a() {
    console.log('1a');
  }
  fullSlider.start();
});

},{}]},{},[1]);
