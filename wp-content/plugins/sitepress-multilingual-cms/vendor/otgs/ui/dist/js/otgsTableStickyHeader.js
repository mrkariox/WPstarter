var OTGSUI = OTGSUI || {}; OTGSUI["otgsTableStickyHeader"] =
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/sticky-table-headers/js/jquery.stickytableheaders.js":
/*!***************************************************************************!*\
  !*** ./node_modules/sticky-table-headers/js/jquery.stickytableheaders.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*! Copyright (c) Jonas Mosbech - https://github.com/jmosbech/StickyTableHeaders
	MIT license info: https://github.com/jmosbech/StickyTableHeaders/blob/master/license.txt */

;(function ($, window, undefined) {
	'use strict';

	var name = 'stickyTableHeaders',
		id = 0,
		defaults = {
			fixedOffset: 0,
			leftOffset: 0,
			marginTop: 0,
			objDocument: document,
			objHead: 'head',
			objWindow: window,
			scrollableArea: window,
			cacheHeaderHeight: false,
			zIndex: 3
		};

	function Plugin (el, options) {
		// To avoid scope issues, use 'base' instead of 'this'
		// to reference this class from internal events and functions.
		var base = this;

		// Access to jQuery and DOM versions of element
		base.$el = $(el);
		base.el = el;
		base.id = id++;

		// Listen for destroyed, call teardown
		base.$el.bind('destroyed',
			$.proxy(base.teardown, base));

		// Cache DOM refs for performance reasons
		base.$clonedHeader = null;
		base.$originalHeader = null;

		// Cache header height for performance reasons
		base.cachedHeaderHeight = null;

		// Keep track of state
		base.isSticky = false;
		base.hasBeenSticky = false;
		base.leftOffset = null;
		base.topOffset = null;

		base.init = function () {
			base.setOptions(options);

			base.$el.each(function () {
				var $this = $(this);

				// remove padding on <table> to fix issue #7
				$this.css('padding', 0);

				base.$originalHeader = $('thead:first', this);
				base.$clonedHeader = base.$originalHeader.clone();
				$this.trigger('clonedHeader.' + name, [base.$clonedHeader]);

				base.$clonedHeader.addClass('tableFloatingHeader');
				base.$clonedHeader.css({display: 'none', opacity: 0.0});

				base.$originalHeader.addClass('tableFloatingHeaderOriginal');

				base.$originalHeader.after(base.$clonedHeader);

				base.$printStyle = $('<style type="text/css" media="print">' +
					'.tableFloatingHeader{display:none !important;}' +
					'.tableFloatingHeaderOriginal{position:static !important;}' +
					'</style>');
				base.$head.append(base.$printStyle);
			});
			
			base.$clonedHeader.find("input, select").attr("disabled", true);

			base.updateWidth();
			base.toggleHeaders();
			base.bind();
		};

		base.destroy = function (){
			base.$el.unbind('destroyed', base.teardown);
			base.teardown();
		};

		base.teardown = function(){
			if (base.isSticky) {
				base.$originalHeader.css('position', 'static');
			}
			$.removeData(base.el, 'plugin_' + name);
			base.unbind();

			base.$clonedHeader.remove();
			base.$originalHeader.removeClass('tableFloatingHeaderOriginal');
			base.$originalHeader.css('visibility', 'visible');
			base.$printStyle.remove();

			base.el = null;
			base.$el = null;
		};

		base.bind = function(){
			base.$scrollableArea.on('scroll.' + name, base.toggleHeaders);
			if (!base.isWindowScrolling) {
				base.$window.on('scroll.' + name + base.id, base.setPositionValues);
				base.$window.on('resize.' + name + base.id, base.toggleHeaders);
			}
			base.$scrollableArea.on('resize.' + name, base.toggleHeaders);
			base.$scrollableArea.on('resize.' + name, base.updateWidth);
		};

		base.unbind = function(){
			// unbind window events by specifying handle so we don't remove too much
			base.$scrollableArea.off('.' + name, base.toggleHeaders);
			if (!base.isWindowScrolling) {
				base.$window.off('.' + name + base.id, base.setPositionValues);
				base.$window.off('.' + name + base.id, base.toggleHeaders);
			}
			base.$scrollableArea.off('.' + name, base.updateWidth);
		};

		// We debounce the functions bound to the scroll and resize events
		base.debounce = function (fn, delay) {
			var timer = null;
			return function () {
				var context = this, args = arguments;
				clearTimeout(timer);
				timer = setTimeout(function () {
					fn.apply(context, args);
				}, delay);
			};
		};

		base.toggleHeaders = base.debounce(function () {
			if (base.$el) {
				base.$el.each(function () {
					var $this = $(this),
						newLeft,
						newTopOffset = base.isWindowScrolling ? (
									isNaN(base.options.fixedOffset) ?
									base.options.fixedOffset.outerHeight() :
									base.options.fixedOffset
								) :
								base.$scrollableArea.offset().top + (!isNaN(base.options.fixedOffset) ? base.options.fixedOffset : 0),
						offset = $this.offset(),

						scrollTop = base.$scrollableArea.scrollTop() + newTopOffset,
						scrollLeft = base.$scrollableArea.scrollLeft(),

						headerHeight,

						scrolledPastTop = base.isWindowScrolling ?
								scrollTop > offset.top :
								newTopOffset > offset.top,
						notScrolledPastBottom;

					if (scrolledPastTop) {
						headerHeight = base.options.cacheHeaderHeight ? base.cachedHeaderHeight : base.$clonedHeader.height();
						notScrolledPastBottom = (base.isWindowScrolling ? scrollTop : 0) <
							(offset.top + $this.height() - headerHeight - (base.isWindowScrolling ? 0 : newTopOffset));
					}

					if (scrolledPastTop && notScrolledPastBottom) {
						newLeft = offset.left - scrollLeft + base.options.leftOffset;
						base.$originalHeader.css({
							'position': 'fixed',
							'margin-top': base.options.marginTop,
                                                        'top': 0,
							'left': newLeft,
							'z-index': base.options.zIndex
						});
						base.leftOffset = newLeft;
						base.topOffset = newTopOffset;
						base.$clonedHeader.css('display', '');
						if (!base.isSticky) {
							base.isSticky = true;
							// make sure the width is correct: the user might have resized the browser while in static mode
							base.updateWidth();
							$this.trigger('enabledStickiness.' + name);
						}
						base.setPositionValues();
					} else if (base.isSticky) {
						base.$originalHeader.css('position', 'static');
						base.$clonedHeader.css('display', 'none');
						base.isSticky = false;
						base.resetWidth($('td,th', base.$clonedHeader), $('td,th', base.$originalHeader));
						$this.trigger('disabledStickiness.' + name);
					}
				});
			}
		}, 0);

		base.setPositionValues = base.debounce(function () {
			var winScrollTop = base.$window.scrollTop(),
				winScrollLeft = base.$window.scrollLeft();
			if (!base.isSticky ||
					winScrollTop < 0 || winScrollTop + base.$window.height() > base.$document.height() ||
					winScrollLeft < 0 || winScrollLeft + base.$window.width() > base.$document.width()) {
				return;
			}
			base.$originalHeader.css({
				'top': base.topOffset - (base.isWindowScrolling ? 0 : winScrollTop),
				'left': base.leftOffset - (base.isWindowScrolling ? 0 : winScrollLeft)
			});
		}, 0);

		base.updateWidth = base.debounce(function () {
			if (!base.isSticky) {
				return;
			}
			// Copy cell widths from clone
			if (!base.$originalHeaderCells) {
				base.$originalHeaderCells = $('th,td', base.$originalHeader);
			}
			if (!base.$clonedHeaderCells) {
				base.$clonedHeaderCells = $('th,td', base.$clonedHeader);
			}
			var cellWidths = base.getWidth(base.$clonedHeaderCells);
			base.setWidth(cellWidths, base.$clonedHeaderCells, base.$originalHeaderCells);

			// Copy row width from whole table
			base.$originalHeader.css('width', base.$clonedHeader.width());

			// If we're caching the height, we need to update the cached value when the width changes
			if (base.options.cacheHeaderHeight) {
				base.cachedHeaderHeight = base.$clonedHeader.height();
			}
		}, 0);

		base.getWidth = function ($clonedHeaders) {
			var widths = [];
			$clonedHeaders.each(function (index) {
				var width, $this = $(this);

				if ($this.css('box-sizing') === 'border-box') {
					var boundingClientRect = $this[0].getBoundingClientRect();
					if(boundingClientRect.width) {
						width = boundingClientRect.width; // #39: border-box bug
					} else {
						width = boundingClientRect.right - boundingClientRect.left; // ie8 bug: getBoundingClientRect() does not have a width property
					}
				} else {
					var $origTh = $('th', base.$originalHeader);
					if ($origTh.css('border-collapse') === 'collapse') {
						if (window.getComputedStyle) {
							width = parseFloat(window.getComputedStyle(this, null).width);
						} else {
							// ie8 only
							var leftPadding = parseFloat($this.css('padding-left'));
							var rightPadding = parseFloat($this.css('padding-right'));
							// Needs more investigation - this is assuming constant border around this cell and it's neighbours.
							var border = parseFloat($this.css('border-width'));
							width = $this.outerWidth() - leftPadding - rightPadding - border;
						}
					} else {
						width = $this.width();
					}
				}

				widths[index] = width;
			});
			return widths;
		};

		base.setWidth = function (widths, $clonedHeaders, $origHeaders) {
			$clonedHeaders.each(function (index) {
				var width = widths[index];
				$origHeaders.eq(index).css({
					'min-width': width,
					'max-width': width
				});
			});
		};

		base.resetWidth = function ($clonedHeaders, $origHeaders) {
			$clonedHeaders.each(function (index) {
				var $this = $(this);
				$origHeaders.eq(index).css({
					'min-width': $this.css('min-width'),
					'max-width': $this.css('max-width')
				});
			});
		};

		base.setOptions = function (options) {
			base.options = $.extend({}, defaults, options);
			base.$window = $(base.options.objWindow);
			base.$head = $(base.options.objHead);
			base.$document = $(base.options.objDocument);
			base.$scrollableArea = $(base.options.scrollableArea);
			base.isWindowScrolling = base.$scrollableArea[0] === base.$window[0];
		};

		base.updateOptions = function (options) {
			base.setOptions(options);
			// scrollableArea might have changed
			base.unbind();
			base.bind();
			base.updateWidth();
			base.toggleHeaders();
		};

		// Run initializer
		base.init();
	}

	// A plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[name] = function ( options ) {
		return this.each(function () {
			var instance = $.data(this, 'plugin_' + name);
			if (instance) {
				if (typeof options === 'string') {
					instance[options].apply(instance);
				} else {
					instance.updateOptions(options);
				}
			} else if(options !== 'destroy') {
				$.data(this, 'plugin_' + name, new Plugin( this, options ));
			}
		});
	};

})(jQuery, window);


/***/ }),

/***/ "./src/js/otgsTableStickyHeader.js":
/*!*****************************************!*\
  !*** ./src/js/otgsTableStickyHeader.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stickyTableHeaders = __webpack_require__(/*! sticky-table-headers */ "./node_modules/sticky-table-headers/js/jquery.stickytableheaders.js");

var _stickyTableHeaders2 = _interopRequireDefault(_stickyTableHeaders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener("DOMContentLoaded", function () {

	/**
  * @param {NodeList} elementS
  */
	var elements = document.querySelectorAll('.js-otgs-table-sticky-header');
	var args = {
		fixedOffset: jQuery('#wpadminbar')
	};

	/**
  * @param {Element} element
  */
	elements.forEach(function (element) {
		jQuery(element).stickyTableHeaders(args).on('enabledStickiness.stickyTableHeaders', function () {
			element.getElementsByClassName('tableFloatingHeaderOriginal')[0].style.background = 'rgba(255,255,255,.8)';
		});
	});
}); /*global jQuery*/

/***/ }),

/***/ 2:
/*!***********************************************!*\
  !*** multi ./src/js/otgsTableStickyHeader.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/js/otgsTableStickyHeader.js */"./src/js/otgsTableStickyHeader.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9PVEdTVUkuW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL09UR1NVSS5bbmFtZV0vLi9ub2RlX21vZHVsZXMvc3RpY2t5LXRhYmxlLWhlYWRlcnMvanMvanF1ZXJ5LnN0aWNreXRhYmxlaGVhZGVycy5qcyIsIndlYnBhY2s6Ly9PVEdTVUkuW25hbWVdLy4vc3JjL2pzL290Z3NUYWJsZVN0aWNreUhlYWRlci5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZWxlbWVudHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhcmdzIiwiZml4ZWRPZmZzZXQiLCJqUXVlcnkiLCJmb3JFYWNoIiwiZWxlbWVudCIsInN0aWNreVRhYmxlSGVhZGVycyIsIm9uIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInN0eWxlIiwiYmFja2dyb3VuZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNuRUE7QUFDQTs7QUFFQSxDQUFDO0FBQ0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtB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QUE1QyxFQUFvRixZQUFNO0FBQ3pGRixXQUFRRyxzQkFBUixDQUErQiw2QkFBL0IsRUFBOEQsQ0FBOUQsRUFBaUVDLEtBQWpFLENBQXVFQyxVQUF2RSxHQUFvRixzQkFBcEY7QUFDQSxHQUZEO0FBR0EsRUFKRDtBQUtBLENBbEJELEUsQ0FKQSxpQiIsImZpbGUiOiJqcy9vdGdzVGFibGVTdGlja3lIZWFkZXIuanM/dmVyPTg1NmI4MzI3NzQ1ZmMyOTY3YjE1NzY5NzQ0ZmM4YzA5Iiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcbiIsIi8qISBDb3B5cmlnaHQgKGMpIEpvbmFzIE1vc2JlY2ggLSBodHRwczovL2dpdGh1Yi5jb20vam1vc2JlY2gvU3RpY2t5VGFibGVIZWFkZXJzXHJcblx0TUlUIGxpY2Vuc2UgaW5mbzogaHR0cHM6Ly9naXRodWIuY29tL2ptb3NiZWNoL1N0aWNreVRhYmxlSGVhZGVycy9ibG9iL21hc3Rlci9saWNlbnNlLnR4dCAqL1xyXG5cclxuOyhmdW5jdGlvbiAoJCwgd2luZG93LCB1bmRlZmluZWQpIHtcclxuXHQndXNlIHN0cmljdCc7XHJcblxyXG5cdHZhciBuYW1lID0gJ3N0aWNreVRhYmxlSGVhZGVycycsXHJcblx0XHRpZCA9IDAsXHJcblx0XHRkZWZhdWx0cyA9IHtcclxuXHRcdFx0Zml4ZWRPZmZzZXQ6IDAsXHJcblx0XHRcdGxlZnRPZmZzZXQ6IDAsXHJcblx0XHRcdG1hcmdpblRvcDogMCxcclxuXHRcdFx0b2JqRG9jdW1lbnQ6IGRvY3VtZW50LFxyXG5cdFx0XHRvYmpIZWFkOiAnaGVhZCcsXHJcblx0XHRcdG9ialdpbmRvdzogd2luZG93LFxyXG5cdFx0XHRzY3JvbGxhYmxlQXJlYTogd2luZG93LFxyXG5cdFx0XHRjYWNoZUhlYWRlckhlaWdodDogZmFsc2UsXHJcblx0XHRcdHpJbmRleDogM1xyXG5cdFx0fTtcclxuXHJcblx0ZnVuY3Rpb24gUGx1Z2luIChlbCwgb3B0aW9ucykge1xyXG5cdFx0Ly8gVG8gYXZvaWQgc2NvcGUgaXNzdWVzLCB1c2UgJ2Jhc2UnIGluc3RlYWQgb2YgJ3RoaXMnXHJcblx0XHQvLyB0byByZWZlcmVuY2UgdGhpcyBjbGFzcyBmcm9tIGludGVybmFsIGV2ZW50cyBhbmQgZnVuY3Rpb25zLlxyXG5cdFx0dmFyIGJhc2UgPSB0aGlzO1xyXG5cclxuXHRcdC8vIEFjY2VzcyB0byBqUXVlcnkgYW5kIERPTSB2ZXJzaW9ucyBvZiBlbGVtZW50XHJcblx0XHRiYXNlLiRlbCA9ICQoZWwpO1xyXG5cdFx0YmFzZS5lbCA9IGVsO1xyXG5cdFx0YmFzZS5pZCA9IGlkKys7XHJcblxyXG5cdFx0Ly8gTGlzdGVuIGZvciBkZXN0cm95ZWQsIGNhbGwgdGVhcmRvd25cclxuXHRcdGJhc2UuJGVsLmJpbmQoJ2Rlc3Ryb3llZCcsXHJcblx0XHRcdCQucHJveHkoYmFzZS50ZWFyZG93biwgYmFzZSkpO1xyXG5cclxuXHRcdC8vIENhY2hlIERPTSByZWZzIGZvciBwZXJmb3JtYW5jZSByZWFzb25zXHJcblx0XHRiYXNlLiRjbG9uZWRIZWFkZXIgPSBudWxsO1xyXG5cdFx0YmFzZS4kb3JpZ2luYWxIZWFkZXIgPSBudWxsO1xyXG5cclxuXHRcdC8vIENhY2hlIGhlYWRlciBoZWlnaHQgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnNcclxuXHRcdGJhc2UuY2FjaGVkSGVhZGVySGVpZ2h0ID0gbnVsbDtcclxuXHJcblx0XHQvLyBLZWVwIHRyYWNrIG9mIHN0YXRlXHJcblx0XHRiYXNlLmlzU3RpY2t5ID0gZmFsc2U7XHJcblx0XHRiYXNlLmhhc0JlZW5TdGlja3kgPSBmYWxzZTtcclxuXHRcdGJhc2UubGVmdE9mZnNldCA9IG51bGw7XHJcblx0XHRiYXNlLnRvcE9mZnNldCA9IG51bGw7XHJcblxyXG5cdFx0YmFzZS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRiYXNlLnNldE9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG5cdFx0XHRiYXNlLiRlbC5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG5cclxuXHRcdFx0XHQvLyByZW1vdmUgcGFkZGluZyBvbiA8dGFibGU+IHRvIGZpeCBpc3N1ZSAjN1xyXG5cdFx0XHRcdCR0aGlzLmNzcygncGFkZGluZycsIDApO1xyXG5cclxuXHRcdFx0XHRiYXNlLiRvcmlnaW5hbEhlYWRlciA9ICQoJ3RoZWFkOmZpcnN0JywgdGhpcyk7XHJcblx0XHRcdFx0YmFzZS4kY2xvbmVkSGVhZGVyID0gYmFzZS4kb3JpZ2luYWxIZWFkZXIuY2xvbmUoKTtcclxuXHRcdFx0XHQkdGhpcy50cmlnZ2VyKCdjbG9uZWRIZWFkZXIuJyArIG5hbWUsIFtiYXNlLiRjbG9uZWRIZWFkZXJdKTtcclxuXHJcblx0XHRcdFx0YmFzZS4kY2xvbmVkSGVhZGVyLmFkZENsYXNzKCd0YWJsZUZsb2F0aW5nSGVhZGVyJyk7XHJcblx0XHRcdFx0YmFzZS4kY2xvbmVkSGVhZGVyLmNzcyh7ZGlzcGxheTogJ25vbmUnLCBvcGFjaXR5OiAwLjB9KTtcclxuXHJcblx0XHRcdFx0YmFzZS4kb3JpZ2luYWxIZWFkZXIuYWRkQ2xhc3MoJ3RhYmxlRmxvYXRpbmdIZWFkZXJPcmlnaW5hbCcpO1xyXG5cclxuXHRcdFx0XHRiYXNlLiRvcmlnaW5hbEhlYWRlci5hZnRlcihiYXNlLiRjbG9uZWRIZWFkZXIpO1xyXG5cclxuXHRcdFx0XHRiYXNlLiRwcmludFN0eWxlID0gJCgnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiIG1lZGlhPVwicHJpbnRcIj4nICtcclxuXHRcdFx0XHRcdCcudGFibGVGbG9hdGluZ0hlYWRlcntkaXNwbGF5Om5vbmUgIWltcG9ydGFudDt9JyArXHJcblx0XHRcdFx0XHQnLnRhYmxlRmxvYXRpbmdIZWFkZXJPcmlnaW5hbHtwb3NpdGlvbjpzdGF0aWMgIWltcG9ydGFudDt9JyArXHJcblx0XHRcdFx0XHQnPC9zdHlsZT4nKTtcclxuXHRcdFx0XHRiYXNlLiRoZWFkLmFwcGVuZChiYXNlLiRwcmludFN0eWxlKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdFxyXG5cdFx0XHRiYXNlLiRjbG9uZWRIZWFkZXIuZmluZChcImlucHV0LCBzZWxlY3RcIikuYXR0cihcImRpc2FibGVkXCIsIHRydWUpO1xyXG5cclxuXHRcdFx0YmFzZS51cGRhdGVXaWR0aCgpO1xyXG5cdFx0XHRiYXNlLnRvZ2dsZUhlYWRlcnMoKTtcclxuXHRcdFx0YmFzZS5iaW5kKCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdGJhc2UuZGVzdHJveSA9IGZ1bmN0aW9uICgpe1xyXG5cdFx0XHRiYXNlLiRlbC51bmJpbmQoJ2Rlc3Ryb3llZCcsIGJhc2UudGVhcmRvd24pO1xyXG5cdFx0XHRiYXNlLnRlYXJkb3duKCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdGJhc2UudGVhcmRvd24gPSBmdW5jdGlvbigpe1xyXG5cdFx0XHRpZiAoYmFzZS5pc1N0aWNreSkge1xyXG5cdFx0XHRcdGJhc2UuJG9yaWdpbmFsSGVhZGVyLmNzcygncG9zaXRpb24nLCAnc3RhdGljJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0JC5yZW1vdmVEYXRhKGJhc2UuZWwsICdwbHVnaW5fJyArIG5hbWUpO1xyXG5cdFx0XHRiYXNlLnVuYmluZCgpO1xyXG5cclxuXHRcdFx0YmFzZS4kY2xvbmVkSGVhZGVyLnJlbW92ZSgpO1xyXG5cdFx0XHRiYXNlLiRvcmlnaW5hbEhlYWRlci5yZW1vdmVDbGFzcygndGFibGVGbG9hdGluZ0hlYWRlck9yaWdpbmFsJyk7XHJcblx0XHRcdGJhc2UuJG9yaWdpbmFsSGVhZGVyLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcblx0XHRcdGJhc2UuJHByaW50U3R5bGUucmVtb3ZlKCk7XHJcblxyXG5cdFx0XHRiYXNlLmVsID0gbnVsbDtcclxuXHRcdFx0YmFzZS4kZWwgPSBudWxsO1xyXG5cdFx0fTtcclxuXHJcblx0XHRiYXNlLmJpbmQgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHRiYXNlLiRzY3JvbGxhYmxlQXJlYS5vbignc2Nyb2xsLicgKyBuYW1lLCBiYXNlLnRvZ2dsZUhlYWRlcnMpO1xyXG5cdFx0XHRpZiAoIWJhc2UuaXNXaW5kb3dTY3JvbGxpbmcpIHtcclxuXHRcdFx0XHRiYXNlLiR3aW5kb3cub24oJ3Njcm9sbC4nICsgbmFtZSArIGJhc2UuaWQsIGJhc2Uuc2V0UG9zaXRpb25WYWx1ZXMpO1xyXG5cdFx0XHRcdGJhc2UuJHdpbmRvdy5vbigncmVzaXplLicgKyBuYW1lICsgYmFzZS5pZCwgYmFzZS50b2dnbGVIZWFkZXJzKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRiYXNlLiRzY3JvbGxhYmxlQXJlYS5vbigncmVzaXplLicgKyBuYW1lLCBiYXNlLnRvZ2dsZUhlYWRlcnMpO1xyXG5cdFx0XHRiYXNlLiRzY3JvbGxhYmxlQXJlYS5vbigncmVzaXplLicgKyBuYW1lLCBiYXNlLnVwZGF0ZVdpZHRoKTtcclxuXHRcdH07XHJcblxyXG5cdFx0YmFzZS51bmJpbmQgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHQvLyB1bmJpbmQgd2luZG93IGV2ZW50cyBieSBzcGVjaWZ5aW5nIGhhbmRsZSBzbyB3ZSBkb24ndCByZW1vdmUgdG9vIG11Y2hcclxuXHRcdFx0YmFzZS4kc2Nyb2xsYWJsZUFyZWEub2ZmKCcuJyArIG5hbWUsIGJhc2UudG9nZ2xlSGVhZGVycyk7XHJcblx0XHRcdGlmICghYmFzZS5pc1dpbmRvd1Njcm9sbGluZykge1xyXG5cdFx0XHRcdGJhc2UuJHdpbmRvdy5vZmYoJy4nICsgbmFtZSArIGJhc2UuaWQsIGJhc2Uuc2V0UG9zaXRpb25WYWx1ZXMpO1xyXG5cdFx0XHRcdGJhc2UuJHdpbmRvdy5vZmYoJy4nICsgbmFtZSArIGJhc2UuaWQsIGJhc2UudG9nZ2xlSGVhZGVycyk7XHJcblx0XHRcdH1cclxuXHRcdFx0YmFzZS4kc2Nyb2xsYWJsZUFyZWEub2ZmKCcuJyArIG5hbWUsIGJhc2UudXBkYXRlV2lkdGgpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBXZSBkZWJvdW5jZSB0aGUgZnVuY3Rpb25zIGJvdW5kIHRvIHRoZSBzY3JvbGwgYW5kIHJlc2l6ZSBldmVudHNcclxuXHRcdGJhc2UuZGVib3VuY2UgPSBmdW5jdGlvbiAoZm4sIGRlbGF5KSB7XHJcblx0XHRcdHZhciB0aW1lciA9IG51bGw7XHJcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0dmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xyXG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lcik7XHJcblx0XHRcdFx0dGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG5cdFx0XHRcdH0sIGRlbGF5KTtcclxuXHRcdFx0fTtcclxuXHRcdH07XHJcblxyXG5cdFx0YmFzZS50b2dnbGVIZWFkZXJzID0gYmFzZS5kZWJvdW5jZShmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmIChiYXNlLiRlbCkge1xyXG5cdFx0XHRcdGJhc2UuJGVsLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKSxcclxuXHRcdFx0XHRcdFx0bmV3TGVmdCxcclxuXHRcdFx0XHRcdFx0bmV3VG9wT2Zmc2V0ID0gYmFzZS5pc1dpbmRvd1Njcm9sbGluZyA/IChcclxuXHRcdFx0XHRcdFx0XHRcdFx0aXNOYU4oYmFzZS5vcHRpb25zLmZpeGVkT2Zmc2V0KSA/XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJhc2Uub3B0aW9ucy5maXhlZE9mZnNldC5vdXRlckhlaWdodCgpIDpcclxuXHRcdFx0XHRcdFx0XHRcdFx0YmFzZS5vcHRpb25zLmZpeGVkT2Zmc2V0XHJcblx0XHRcdFx0XHRcdFx0XHQpIDpcclxuXHRcdFx0XHRcdFx0XHRcdGJhc2UuJHNjcm9sbGFibGVBcmVhLm9mZnNldCgpLnRvcCArICghaXNOYU4oYmFzZS5vcHRpb25zLmZpeGVkT2Zmc2V0KSA/IGJhc2Uub3B0aW9ucy5maXhlZE9mZnNldCA6IDApLFxyXG5cdFx0XHRcdFx0XHRvZmZzZXQgPSAkdGhpcy5vZmZzZXQoKSxcclxuXHJcblx0XHRcdFx0XHRcdHNjcm9sbFRvcCA9IGJhc2UuJHNjcm9sbGFibGVBcmVhLnNjcm9sbFRvcCgpICsgbmV3VG9wT2Zmc2V0LFxyXG5cdFx0XHRcdFx0XHRzY3JvbGxMZWZ0ID0gYmFzZS4kc2Nyb2xsYWJsZUFyZWEuc2Nyb2xsTGVmdCgpLFxyXG5cclxuXHRcdFx0XHRcdFx0aGVhZGVySGVpZ2h0LFxyXG5cclxuXHRcdFx0XHRcdFx0c2Nyb2xsZWRQYXN0VG9wID0gYmFzZS5pc1dpbmRvd1Njcm9sbGluZyA/XHJcblx0XHRcdFx0XHRcdFx0XHRzY3JvbGxUb3AgPiBvZmZzZXQudG9wIDpcclxuXHRcdFx0XHRcdFx0XHRcdG5ld1RvcE9mZnNldCA+IG9mZnNldC50b3AsXHJcblx0XHRcdFx0XHRcdG5vdFNjcm9sbGVkUGFzdEJvdHRvbTtcclxuXHJcblx0XHRcdFx0XHRpZiAoc2Nyb2xsZWRQYXN0VG9wKSB7XHJcblx0XHRcdFx0XHRcdGhlYWRlckhlaWdodCA9IGJhc2Uub3B0aW9ucy5jYWNoZUhlYWRlckhlaWdodCA/IGJhc2UuY2FjaGVkSGVhZGVySGVpZ2h0IDogYmFzZS4kY2xvbmVkSGVhZGVyLmhlaWdodCgpO1xyXG5cdFx0XHRcdFx0XHRub3RTY3JvbGxlZFBhc3RCb3R0b20gPSAoYmFzZS5pc1dpbmRvd1Njcm9sbGluZyA/IHNjcm9sbFRvcCA6IDApIDxcclxuXHRcdFx0XHRcdFx0XHQob2Zmc2V0LnRvcCArICR0aGlzLmhlaWdodCgpIC0gaGVhZGVySGVpZ2h0IC0gKGJhc2UuaXNXaW5kb3dTY3JvbGxpbmcgPyAwIDogbmV3VG9wT2Zmc2V0KSk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKHNjcm9sbGVkUGFzdFRvcCAmJiBub3RTY3JvbGxlZFBhc3RCb3R0b20pIHtcclxuXHRcdFx0XHRcdFx0bmV3TGVmdCA9IG9mZnNldC5sZWZ0IC0gc2Nyb2xsTGVmdCArIGJhc2Uub3B0aW9ucy5sZWZ0T2Zmc2V0O1xyXG5cdFx0XHRcdFx0XHRiYXNlLiRvcmlnaW5hbEhlYWRlci5jc3Moe1xyXG5cdFx0XHRcdFx0XHRcdCdwb3NpdGlvbic6ICdmaXhlZCcsXHJcblx0XHRcdFx0XHRcdFx0J21hcmdpbi10b3AnOiBiYXNlLm9wdGlvbnMubWFyZ2luVG9wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0b3AnOiAwLFxyXG5cdFx0XHRcdFx0XHRcdCdsZWZ0JzogbmV3TGVmdCxcclxuXHRcdFx0XHRcdFx0XHQnei1pbmRleCc6IGJhc2Uub3B0aW9ucy56SW5kZXhcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdGJhc2UubGVmdE9mZnNldCA9IG5ld0xlZnQ7XHJcblx0XHRcdFx0XHRcdGJhc2UudG9wT2Zmc2V0ID0gbmV3VG9wT2Zmc2V0O1xyXG5cdFx0XHRcdFx0XHRiYXNlLiRjbG9uZWRIZWFkZXIuY3NzKCdkaXNwbGF5JywgJycpO1xyXG5cdFx0XHRcdFx0XHRpZiAoIWJhc2UuaXNTdGlja3kpIHtcclxuXHRcdFx0XHRcdFx0XHRiYXNlLmlzU3RpY2t5ID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHQvLyBtYWtlIHN1cmUgdGhlIHdpZHRoIGlzIGNvcnJlY3Q6IHRoZSB1c2VyIG1pZ2h0IGhhdmUgcmVzaXplZCB0aGUgYnJvd3NlciB3aGlsZSBpbiBzdGF0aWMgbW9kZVxyXG5cdFx0XHRcdFx0XHRcdGJhc2UudXBkYXRlV2lkdGgoKTtcclxuXHRcdFx0XHRcdFx0XHQkdGhpcy50cmlnZ2VyKCdlbmFibGVkU3RpY2tpbmVzcy4nICsgbmFtZSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0YmFzZS5zZXRQb3NpdGlvblZhbHVlcygpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChiYXNlLmlzU3RpY2t5KSB7XHJcblx0XHRcdFx0XHRcdGJhc2UuJG9yaWdpbmFsSGVhZGVyLmNzcygncG9zaXRpb24nLCAnc3RhdGljJyk7XHJcblx0XHRcdFx0XHRcdGJhc2UuJGNsb25lZEhlYWRlci5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cdFx0XHRcdFx0XHRiYXNlLmlzU3RpY2t5ID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdGJhc2UucmVzZXRXaWR0aCgkKCd0ZCx0aCcsIGJhc2UuJGNsb25lZEhlYWRlciksICQoJ3RkLHRoJywgYmFzZS4kb3JpZ2luYWxIZWFkZXIpKTtcclxuXHRcdFx0XHRcdFx0JHRoaXMudHJpZ2dlcignZGlzYWJsZWRTdGlja2luZXNzLicgKyBuYW1lKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgMCk7XHJcblxyXG5cdFx0YmFzZS5zZXRQb3NpdGlvblZhbHVlcyA9IGJhc2UuZGVib3VuY2UoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgd2luU2Nyb2xsVG9wID0gYmFzZS4kd2luZG93LnNjcm9sbFRvcCgpLFxyXG5cdFx0XHRcdHdpblNjcm9sbExlZnQgPSBiYXNlLiR3aW5kb3cuc2Nyb2xsTGVmdCgpO1xyXG5cdFx0XHRpZiAoIWJhc2UuaXNTdGlja3kgfHxcclxuXHRcdFx0XHRcdHdpblNjcm9sbFRvcCA8IDAgfHwgd2luU2Nyb2xsVG9wICsgYmFzZS4kd2luZG93LmhlaWdodCgpID4gYmFzZS4kZG9jdW1lbnQuaGVpZ2h0KCkgfHxcclxuXHRcdFx0XHRcdHdpblNjcm9sbExlZnQgPCAwIHx8IHdpblNjcm9sbExlZnQgKyBiYXNlLiR3aW5kb3cud2lkdGgoKSA+IGJhc2UuJGRvY3VtZW50LndpZHRoKCkpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0YmFzZS4kb3JpZ2luYWxIZWFkZXIuY3NzKHtcclxuXHRcdFx0XHQndG9wJzogYmFzZS50b3BPZmZzZXQgLSAoYmFzZS5pc1dpbmRvd1Njcm9sbGluZyA/IDAgOiB3aW5TY3JvbGxUb3ApLFxyXG5cdFx0XHRcdCdsZWZ0JzogYmFzZS5sZWZ0T2Zmc2V0IC0gKGJhc2UuaXNXaW5kb3dTY3JvbGxpbmcgPyAwIDogd2luU2Nyb2xsTGVmdClcclxuXHRcdFx0fSk7XHJcblx0XHR9LCAwKTtcclxuXHJcblx0XHRiYXNlLnVwZGF0ZVdpZHRoID0gYmFzZS5kZWJvdW5jZShmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICghYmFzZS5pc1N0aWNreSkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBDb3B5IGNlbGwgd2lkdGhzIGZyb20gY2xvbmVcclxuXHRcdFx0aWYgKCFiYXNlLiRvcmlnaW5hbEhlYWRlckNlbGxzKSB7XHJcblx0XHRcdFx0YmFzZS4kb3JpZ2luYWxIZWFkZXJDZWxscyA9ICQoJ3RoLHRkJywgYmFzZS4kb3JpZ2luYWxIZWFkZXIpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICghYmFzZS4kY2xvbmVkSGVhZGVyQ2VsbHMpIHtcclxuXHRcdFx0XHRiYXNlLiRjbG9uZWRIZWFkZXJDZWxscyA9ICQoJ3RoLHRkJywgYmFzZS4kY2xvbmVkSGVhZGVyKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR2YXIgY2VsbFdpZHRocyA9IGJhc2UuZ2V0V2lkdGgoYmFzZS4kY2xvbmVkSGVhZGVyQ2VsbHMpO1xyXG5cdFx0XHRiYXNlLnNldFdpZHRoKGNlbGxXaWR0aHMsIGJhc2UuJGNsb25lZEhlYWRlckNlbGxzLCBiYXNlLiRvcmlnaW5hbEhlYWRlckNlbGxzKTtcclxuXHJcblx0XHRcdC8vIENvcHkgcm93IHdpZHRoIGZyb20gd2hvbGUgdGFibGVcclxuXHRcdFx0YmFzZS4kb3JpZ2luYWxIZWFkZXIuY3NzKCd3aWR0aCcsIGJhc2UuJGNsb25lZEhlYWRlci53aWR0aCgpKTtcclxuXHJcblx0XHRcdC8vIElmIHdlJ3JlIGNhY2hpbmcgdGhlIGhlaWdodCwgd2UgbmVlZCB0byB1cGRhdGUgdGhlIGNhY2hlZCB2YWx1ZSB3aGVuIHRoZSB3aWR0aCBjaGFuZ2VzXHJcblx0XHRcdGlmIChiYXNlLm9wdGlvbnMuY2FjaGVIZWFkZXJIZWlnaHQpIHtcclxuXHRcdFx0XHRiYXNlLmNhY2hlZEhlYWRlckhlaWdodCA9IGJhc2UuJGNsb25lZEhlYWRlci5oZWlnaHQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgMCk7XHJcblxyXG5cdFx0YmFzZS5nZXRXaWR0aCA9IGZ1bmN0aW9uICgkY2xvbmVkSGVhZGVycykge1xyXG5cdFx0XHR2YXIgd2lkdGhzID0gW107XHJcblx0XHRcdCRjbG9uZWRIZWFkZXJzLmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XHJcblx0XHRcdFx0dmFyIHdpZHRoLCAkdGhpcyA9ICQodGhpcyk7XHJcblxyXG5cdFx0XHRcdGlmICgkdGhpcy5jc3MoJ2JveC1zaXppbmcnKSA9PT0gJ2JvcmRlci1ib3gnKSB7XHJcblx0XHRcdFx0XHR2YXIgYm91bmRpbmdDbGllbnRSZWN0ID0gJHRoaXNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0XHRcdFx0XHRpZihib3VuZGluZ0NsaWVudFJlY3Qud2lkdGgpIHtcclxuXHRcdFx0XHRcdFx0d2lkdGggPSBib3VuZGluZ0NsaWVudFJlY3Qud2lkdGg7IC8vICMzOTogYm9yZGVyLWJveCBidWdcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHdpZHRoID0gYm91bmRpbmdDbGllbnRSZWN0LnJpZ2h0IC0gYm91bmRpbmdDbGllbnRSZWN0LmxlZnQ7IC8vIGllOCBidWc6IGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIGRvZXMgbm90IGhhdmUgYSB3aWR0aCBwcm9wZXJ0eVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR2YXIgJG9yaWdUaCA9ICQoJ3RoJywgYmFzZS4kb3JpZ2luYWxIZWFkZXIpO1xyXG5cdFx0XHRcdFx0aWYgKCRvcmlnVGguY3NzKCdib3JkZXItY29sbGFwc2UnKSA9PT0gJ2NvbGxhcHNlJykge1xyXG5cdFx0XHRcdFx0XHRpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUpIHtcclxuXHRcdFx0XHRcdFx0XHR3aWR0aCA9IHBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcywgbnVsbCkud2lkdGgpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdC8vIGllOCBvbmx5XHJcblx0XHRcdFx0XHRcdFx0dmFyIGxlZnRQYWRkaW5nID0gcGFyc2VGbG9hdCgkdGhpcy5jc3MoJ3BhZGRpbmctbGVmdCcpKTtcclxuXHRcdFx0XHRcdFx0XHR2YXIgcmlnaHRQYWRkaW5nID0gcGFyc2VGbG9hdCgkdGhpcy5jc3MoJ3BhZGRpbmctcmlnaHQnKSk7XHJcblx0XHRcdFx0XHRcdFx0Ly8gTmVlZHMgbW9yZSBpbnZlc3RpZ2F0aW9uIC0gdGhpcyBpcyBhc3N1bWluZyBjb25zdGFudCBib3JkZXIgYXJvdW5kIHRoaXMgY2VsbCBhbmQgaXQncyBuZWlnaGJvdXJzLlxyXG5cdFx0XHRcdFx0XHRcdHZhciBib3JkZXIgPSBwYXJzZUZsb2F0KCR0aGlzLmNzcygnYm9yZGVyLXdpZHRoJykpO1xyXG5cdFx0XHRcdFx0XHRcdHdpZHRoID0gJHRoaXMub3V0ZXJXaWR0aCgpIC0gbGVmdFBhZGRpbmcgLSByaWdodFBhZGRpbmcgLSBib3JkZXI7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHdpZHRoID0gJHRoaXMud2lkdGgoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHdpZHRoc1tpbmRleF0gPSB3aWR0aDtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiB3aWR0aHM7XHJcblx0XHR9O1xyXG5cclxuXHRcdGJhc2Uuc2V0V2lkdGggPSBmdW5jdGlvbiAod2lkdGhzLCAkY2xvbmVkSGVhZGVycywgJG9yaWdIZWFkZXJzKSB7XHJcblx0XHRcdCRjbG9uZWRIZWFkZXJzLmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XHJcblx0XHRcdFx0dmFyIHdpZHRoID0gd2lkdGhzW2luZGV4XTtcclxuXHRcdFx0XHQkb3JpZ0hlYWRlcnMuZXEoaW5kZXgpLmNzcyh7XHJcblx0XHRcdFx0XHQnbWluLXdpZHRoJzogd2lkdGgsXHJcblx0XHRcdFx0XHQnbWF4LXdpZHRoJzogd2lkdGhcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdGJhc2UucmVzZXRXaWR0aCA9IGZ1bmN0aW9uICgkY2xvbmVkSGVhZGVycywgJG9yaWdIZWFkZXJzKSB7XHJcblx0XHRcdCRjbG9uZWRIZWFkZXJzLmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XHJcblx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcclxuXHRcdFx0XHQkb3JpZ0hlYWRlcnMuZXEoaW5kZXgpLmNzcyh7XHJcblx0XHRcdFx0XHQnbWluLXdpZHRoJzogJHRoaXMuY3NzKCdtaW4td2lkdGgnKSxcclxuXHRcdFx0XHRcdCdtYXgtd2lkdGgnOiAkdGhpcy5jc3MoJ21heC13aWR0aCcpXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHJcblx0XHRiYXNlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG5cdFx0XHRiYXNlLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xyXG5cdFx0XHRiYXNlLiR3aW5kb3cgPSAkKGJhc2Uub3B0aW9ucy5vYmpXaW5kb3cpO1xyXG5cdFx0XHRiYXNlLiRoZWFkID0gJChiYXNlLm9wdGlvbnMub2JqSGVhZCk7XHJcblx0XHRcdGJhc2UuJGRvY3VtZW50ID0gJChiYXNlLm9wdGlvbnMub2JqRG9jdW1lbnQpO1xyXG5cdFx0XHRiYXNlLiRzY3JvbGxhYmxlQXJlYSA9ICQoYmFzZS5vcHRpb25zLnNjcm9sbGFibGVBcmVhKTtcclxuXHRcdFx0YmFzZS5pc1dpbmRvd1Njcm9sbGluZyA9IGJhc2UuJHNjcm9sbGFibGVBcmVhWzBdID09PSBiYXNlLiR3aW5kb3dbMF07XHJcblx0XHR9O1xyXG5cclxuXHRcdGJhc2UudXBkYXRlT3B0aW9ucyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcblx0XHRcdGJhc2Uuc2V0T3B0aW9ucyhvcHRpb25zKTtcclxuXHRcdFx0Ly8gc2Nyb2xsYWJsZUFyZWEgbWlnaHQgaGF2ZSBjaGFuZ2VkXHJcblx0XHRcdGJhc2UudW5iaW5kKCk7XHJcblx0XHRcdGJhc2UuYmluZCgpO1xyXG5cdFx0XHRiYXNlLnVwZGF0ZVdpZHRoKCk7XHJcblx0XHRcdGJhc2UudG9nZ2xlSGVhZGVycygpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBSdW4gaW5pdGlhbGl6ZXJcclxuXHRcdGJhc2UuaW5pdCgpO1xyXG5cdH1cclxuXHJcblx0Ly8gQSBwbHVnaW4gd3JhcHBlciBhcm91bmQgdGhlIGNvbnN0cnVjdG9yLFxyXG5cdC8vIHByZXZlbnRpbmcgYWdhaW5zdCBtdWx0aXBsZSBpbnN0YW50aWF0aW9uc1xyXG5cdCQuZm5bbmFtZV0gPSBmdW5jdGlvbiAoIG9wdGlvbnMgKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIGluc3RhbmNlID0gJC5kYXRhKHRoaXMsICdwbHVnaW5fJyArIG5hbWUpO1xyXG5cdFx0XHRpZiAoaW5zdGFuY2UpIHtcclxuXHRcdFx0XHRpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0XHRpbnN0YW5jZVtvcHRpb25zXS5hcHBseShpbnN0YW5jZSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGluc3RhbmNlLnVwZGF0ZU9wdGlvbnMob3B0aW9ucyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2UgaWYob3B0aW9ucyAhPT0gJ2Rlc3Ryb3knKSB7XHJcblx0XHRcdFx0JC5kYXRhKHRoaXMsICdwbHVnaW5fJyArIG5hbWUsIG5ldyBQbHVnaW4oIHRoaXMsIG9wdGlvbnMgKSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG59KShqUXVlcnksIHdpbmRvdyk7XHJcbiIsIi8qZ2xvYmFsIGpRdWVyeSovXG5cbmltcG9ydCBzdGlja3lUYWJsZUhlYWRlcnMgZnJvbSAnc3RpY2t5LXRhYmxlLWhlYWRlcnMnO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge05vZGVMaXN0fSBlbGVtZW50U1xuXHQgKi9cblx0Y29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtb3Rncy10YWJsZS1zdGlja3ktaGVhZGVyJyk7XG5cdGNvbnN0IGFyZ3MgPSB7XG5cdFx0Zml4ZWRPZmZzZXQ6IGpRdWVyeSgnI3dwYWRtaW5iYXInKVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcblx0ICovXG5cdGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG5cdFx0alF1ZXJ5KGVsZW1lbnQpLnN0aWNreVRhYmxlSGVhZGVycyhhcmdzKS5vbignZW5hYmxlZFN0aWNraW5lc3Muc3RpY2t5VGFibGVIZWFkZXJzJywgKCkgPT4ge1xuXHRcdFx0ZWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0YWJsZUZsb2F0aW5nSGVhZGVyT3JpZ2luYWwnKVswXS5zdHlsZS5iYWNrZ3JvdW5kID0gJ3JnYmEoMjU1LDI1NSwyNTUsLjgpJztcblx0XHR9KTtcblx0fSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=