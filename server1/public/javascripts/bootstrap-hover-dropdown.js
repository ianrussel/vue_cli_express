/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.js":
/***/ (function(module, exports) {

/**
 * Project: Bootstrap Hover Dropdown
 * Author: Cameron Spear
 * Contributors: Mattia Larentis
 *
 * Dependencies: Bootstrap's Dropdown plugin, jQuery
 *
 * A simple plugin to enable Bootstrap dropdowns to active on hover and provide a nice user experience.
 *
 * License: MIT
 *
 * http://cameronspear.com/blog/bootstrap-dropdown-on-hover-plugin/
 */
!function (e, n) {
  var o = e();e.fn.dropdownHover = function (t) {
    return "ontouchstart" in document ? this : (o = o.add(this.parent()), this.each(function () {
      var i,
          r = e(this),
          s = r.parent(),
          d = { delay: 500, instantlyCloseOthers: !0 },
          a = { delay: e(this).data("delay"), instantlyCloseOthers: e(this).data("close-others") },
          h = "show.bs.dropdown",
          u = "hide.bs.dropdown",
          l = e.extend(!0, {}, d, t, a);s.hover(function (e) {
        return s.hasClass("open") || r.is(e.target) ? (o.find(":focus").blur(), l.instantlyCloseOthers === !0 && o.removeClass("open"), n.clearTimeout(i), s.addClass("open"), void r.trigger(h)) : !0;
      }, function () {
        i = n.setTimeout(function () {
          s.removeClass("open"), r.trigger(u);
        }, l.delay);
      }), r.hover(function () {
        o.find(":focus").blur(), l.instantlyCloseOthers === !0 && o.removeClass("open"), n.clearTimeout(i), s.addClass("open"), r.trigger(h);
      }), s.find(".dropdown-submenu").each(function () {
        var o,
            t = e(this);t.hover(function () {
          n.clearTimeout(o), t.children(".dropdown-menu").show(), t.siblings().children(".dropdown-menu").hide();
        }, function () {
          var e = t.children(".dropdown-menu");o = n.setTimeout(function () {
            e.hide();
          }, l.delay);
        });
      });
    }));
  }, e(document).ready(function () {
    e('[data-hover="dropdown"]').not(".hover-initialized").each(function () {
      e(this).dropdownHover(), e(this).addClass("hover-initialized");
    });
  });
}(jQuery, this);

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./public/assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.js");


/***/ })

/******/ });