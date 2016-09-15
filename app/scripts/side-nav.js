/**
 *
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SideNav = function () {
  function SideNav() {
    _classCallCheck(this, SideNav);

    this.showButtonEl = document.querySelector('.js-menu-show');
    this.hideButtonEl = document.querySelector('.js-menu-hide');
    this.sideNavEl = document.querySelector('.js-side-nav');
    this.sideNavContainerEl = document.querySelector('.js-side-nav-container');
    this.sideNavElItem = document.querySelectorAll('.side-nav__content .main-nav__item');
    // Control whether the container's children can be focused
    // Set initial state to inert since the drawer is offscreen
    this.detabinator = new Detabinator(this.sideNavContainerEl);
    this.detabinator.inert = true;

    this.showSideNav = this.showSideNav.bind(this);
    this.hideSideNav = this.hideSideNav.bind(this);
    this.blockClicks = this.blockClicks.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);
    this.update = this.update.bind(this);

    this.startX = 0;
    this.currentX = 0;
    this.touchingSideNav = false;

    this.supportsPassive = undefined;
    this.addEventListeners();
  }

  // apply passive event listening if it's supported


  _createClass(SideNav, [{
    key: 'applyPassive',
    value: function applyPassive() {
      if (this.supportsPassive !== undefined) {
        return this.supportsPassive ? { passive: true } : false;
      }
      // feature detect
      var isSupported = false;
      try {
        document.addEventListener('test', null, { get passive() {
            isSupported = true;
          } });
      } catch (e) {}
      this.supportsPassive = isSupported;
      return this.applyPassive();
    }
  }, {
    key: 'addEventListeners',
    value: function addEventListeners() {
      this.showButtonEl.addEventListener('click', this.showSideNav);
      this.hideButtonEl.addEventListener('click', this.hideSideNav);
      this.sideNavEl.addEventListener('click', this.hideSideNav);
      this.sideNavContainerEl.addEventListener('click', this.blockClicks);

      this.sideNavEl.addEventListener('touchstart', this.onTouchStart, this.applyPassive());
      this.sideNavEl.addEventListener('touchmove', this.onTouchMove, this.applyPassive());
      this.sideNavEl.addEventListener('touchend', this.onTouchEnd);

      for (var i = 0, len = this.sideNavElItem.length; i < len; i++) {
        this.sideNavElItem[i].addEventListener('click', this.hideSideNav);
      }
    }
  }, {
    key: 'onTouchStart',
    value: function onTouchStart(evt) {
      if (!this.sideNavEl.classList.contains('side-nav--visible')) return;

      this.startX = evt.touches[0].pageX;
      this.currentX = this.startX;

      this.touchingSideNav = true;
      requestAnimationFrame(this.update);
    }
  }, {
    key: 'onTouchMove',
    value: function onTouchMove(evt) {
      if (!this.touchingSideNav) return;

      this.currentX = evt.touches[0].pageX;
      var translateX = Math.min(0, this.currentX - this.startX);

      if (translateX < 0) {
        evt.preventDefault();
      }
    }
  }, {
    key: 'onTouchEnd',
    value: function onTouchEnd(evt) {
      if (!this.touchingSideNav) return;

      this.touchingSideNav = false;

      var translateX = Math.min(0, this.currentX - this.startX);
      this.sideNavContainerEl.style.transform = '';

      if (translateX < 0) {
        this.hideSideNav();
      }
    }
  }, {
    key: 'update',
    value: function update() {
      if (!this.touchingSideNav) return;

      requestAnimationFrame(this.update);

      var translateX = Math.min(0, this.currentX - this.startX);
      this.sideNavContainerEl.style.transform = 'translateX(' + translateX + 'px)';
    }
  }, {
    key: 'blockClicks',
    value: function blockClicks(evt) {
      evt.stopPropagation();
    }
  }, {
    key: 'onTransitionEnd',
    value: function onTransitionEnd(evt) {
      this.sideNavEl.classList.remove('side-nav--animatable');
      this.sideNavEl.removeEventListener('transitionend', this.onTransitionEnd);
    }
  }, {
    key: 'showSideNav',
    value: function showSideNav() {
      this.sideNavEl.classList.add('side-nav--animatable');
      this.sideNavEl.classList.add('side-nav--visible');
      this.detabinator.inert = false;
      this.sideNavEl.addEventListener('transitionend', this.onTransitionEnd);
    }
  }, {
    key: 'hideSideNav',
    value: function hideSideNav() {
      this.sideNavEl.classList.add('side-nav--animatable');
      this.sideNavEl.classList.remove('side-nav--visible');
      this.detabinator.inert = true;
      this.sideNavEl.addEventListener('transitionend', this.onTransitionEnd);
    }
  }]);

  return SideNav;
}();

new SideNav();
