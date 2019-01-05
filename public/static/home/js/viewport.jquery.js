'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * @Author Anton Zinovyev
 * @Package: jquery.viewport
 * @License: http://www.opensource.org/licenses/mit-license.php
 */
(function ($) {
    /** @return boolean */
    function _hasScroll(element) {
        return element ? element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth : false;
    }

    /** @return HTMLElement */
    function getScrollableParent(element) {
        if (!element) {
            return window.document.body;
        }

        while (element.tagName !== 'BODY' && !_hasScroll(element)) {
            element = element.parentElement;
        }

        return element;
    }

    /** @return {top, bottom, left, right, width, height, viewportWidth, viewportHeight} */
    function getRelativePosition(element, viewport) {
        var vpRect = viewport ? viewport.tagName === 'BODY' ? { top: 0, left: 0, width: window.innerWidth, right: window.innerWidth, height: window.innerHeight, bottom: window.innerHeight } : viewport.getBoundingClientRect() : { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 },
            elRect = element ? element.getBoundingClientRect() : { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };

        return {
            viewport: viewport,
            viewportWidth: vpRect.width,
            viewportHeight: vpRect.height,

            element: element,
            elementWidth: elRect.width,
            elementHeight: elRect.height,

            top: elRect.top - vpRect.top,
            bottom: vpRect.bottom - elRect.bottom,
            left: elRect.left - vpRect.left,
            right: vpRect.right - elRect.right
        };
    }

    /** @return boolean */
    function _inViewport(element) {
        var threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var viewport = arguments[2];

        var pos = getRelativePosition(element, viewport);

        return pos.top - threshold >= 0 && pos.bottom - threshold >= 0 && pos.left - threshold >= 0 && pos.right - threshold >= 0;
    }

    /** @return {inViewport, vertical, horizontal, top, bottom, left, right, width, height, viewportWidth, viewportHeight}  */
    function _getState(element) {
        var threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var allowPartly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var viewport = arguments[3];

        var pos = getRelativePosition(element, viewport);

        pos.inViewport = pos.top - threshold >= 0 && pos.bottom - threshold >= 0 && pos.left - threshold >= 0 && pos.right - threshold >= 0;

        if (pos.top - threshold >= 0 && pos.bottom - threshold >= 0) {
            pos.vertical = 'inside';
        } else if (pos.top - threshold <= 0 && pos.bottom - threshold <= 0) {
            pos.vertical = 'exceeds';
        } else if (allowPartly) {
            pos.vertical = pos.top - threshold <= 0 ? pos.bottom - threshold - pos.viewportHeight > pos.elementHeight ? 'above' : 'partly-above' : pos.top - threshold - pos.viewportHeight > pos.elementHeight ? 'below' : 'partly-below';
        } else {
            pos.vertical = pos.top - threshold <= 0 ? 'above' : 'below';
        }

        if (pos.left - threshold >= 0 && pos.right - threshold >= 0) {
            pos.horizontal = 'inside';
        } else if (pos.left - threshold <= 0 && pos.right - threshold <= 0) {
            pos.horizontal = 'exceeds';
        } else if (allowPartly) {
            pos.horizontal = pos.left - threshold <= 0 ? pos.right - threshold - pos.viewportWidth > pos.elementWidth ? 'left' : 'partly-left' : pos.left - threshold - pos.viewportWidth > pos.elementWidth ? 'right' : 'partly-right';
        } else {
            pos.horizontal = pos.top - threshold <= 0 ? 'left' : 'right';
        }

        return pos;
    }

    var viewportFunctions = {
        /** @return boolean */
        hasScroll: function hasScroll() {
            if (!this.length) {
                return false;
            }

            return _hasScroll(this[0]);
        },


        /** @return HTMLElement */
        scrollableParent: function scrollableParent() {
            return getScrollableParent(this[0]);
        },


        /** @return {top, bottom, left, right, width, height, viewportWidth, viewportHeight} */
        relativePosition: function relativePosition() {
            var viewport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.scrollableParent();

            return getRelativePosition(this[0], viewport ? viewport instanceof $ ? viewport[0] : viewport : this.scrollableParent());
        },


        /** @return boolean */
        inViewport: function inViewport() {
            var threshold = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var viewport = arguments[1];

            if (!this.length) {
                return false;
            }

            return _inViewport(this[0], threshold, viewport || this.scrollableParent());
        },


        /** @return {inViewport, vertical, horizontal, top, bottom, left, right, width, height, viewportWidth, viewportHeight}  */
        getState: function getState() {
            var threshold = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var allowPartly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var viewport = arguments[2];

            viewport = viewport || this.scrollableParent();

            if (!this.length) {
                return { inViewport: false, vertical: 'inside', horizontal: 'inside', top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0, viewportWidth: 0, viewportHeight: 0 };
            }

            return _getState(this[0], threshold, allowPartly, viewport);
        }
    };

    $.fn.viewport = function () {
        return _extends({}, this, viewportFunctions);
    };

    $.extend($.expr[':'], {
        hasScroll: function hasScroll(element) {
            return _hasScroll(element);
        },
        hasScrollVertical: function hasScrollVertical(element) {
            return element.offsetHeight < element.scrollHeight;
        },
        hasScrollHorizontal: function hasScrollHorizontal(element) {
            return element.offsetWidth < element.scrollWidth;
        },
        inViewport: function inViewport(element, i, meta) {
            var param = (meta[3] || '').split(','),
                threshold = param[0] && (param[0] = param[0].trim()) ? parseInt(param[0], 10) : 0,
                viewport = param[1] && (param[1] = param[1].trim()) ? $(param[1])[0] || undefined : undefined;

            return _inViewport(element, threshold, viewport || getScrollableParent(element));
        },
        aboveTheViewport: function aboveTheViewport(element, i, meta) {
            var param = (meta[3] || '').split(','),
                threshold = param[0] && (param[0] = param[0].trim()) ? parseInt(param[0], 10) : 0,
                viewport = param[1] && (param[1] = param[1].trim()) ? $(param[1])[0] || undefined : undefined,
                pos = getRelativePosition(element, viewport || getScrollableParent(element));

            return pos.top - threshold <= 0 && pos.bottom >= 0;
        },
        belowTheViewport: function belowTheViewport(element, i, meta) {
            var param = (meta[3] || '').split(','),
                threshold = param[0] && (param[0] = param[0].trim()) ? parseInt(param[0], 10) : 0,
                viewport = param[1] && (param[1] = param[1].trim()) ? $(param[1])[0] || undefined : undefined,
                pos = getRelativePosition(element, viewport || getScrollableParent(element));

            return pos.bottom - threshold <= 0 && pos.top >= 0;
        },
        leftOfViewport: function leftOfViewport(element, i, meta) {
            var param = (meta[3] || '').split(','),
                threshold = param[0] && (param[0] = param[0].trim()) ? parseInt(param[0], 10) : 0,
                viewport = param[1] && (param[1] = param[1].trim()) ? $(param[1])[0] || undefined : undefined,
                pos = getRelativePosition(element, viewport || getScrollableParent(element));

            return pos.left - threshold <= 0 && pos.right >= 0;
        },
        rightOfViewport: function rightOfViewport(element, i, meta) {
            var param = (meta[3] || '').split(','),
                threshold = param[0] && (param[0] = param[0].trim()) ? parseInt(param[0], 10) : 0,
                viewport = param[1] && (param[1] = param[1].trim()) ? $(param[1])[0] || undefined : undefined,
                pos = getRelativePosition(element, viewport || getScrollableParent(element));

            return pos.right - threshold <= 0 && pos.left >= 0;
        },
        aboveTheViewportPartly: function aboveTheViewportPartly(element, i, meta) {
            var param = (meta[3] || '').split(','),
                threshold = param[0] && (param[0] = param[0].trim()) ? parseInt(param[0], 10) : 0,
                viewport = param[1] && (param[1] = param[1].trim()) ? $(param[1])[0] || undefined : undefined,
                pos = getRelativePosition(element, viewport || getScrollableParent(element));

            return pos.top - threshold <= 0 && pos.bottom >= 0 && pos.bottom - threshold - pos.viewportHeight > pos.elementHeight;
        },
        belowTheViewportPartly: function belowTheViewportPartly(element, i, meta) {
            var param = (meta[3] || '').split(','),
                threshold = param[0] && (param[0] = param[0].trim()) ? parseInt(param[0], 10) : 0,
                viewport = param[1] && (param[1] = param[1].trim()) ? $(param[1])[0] || undefined : undefined,
                pos = getRelativePosition(element, viewport || getScrollableParent(element));

            return pos.bottom - threshold <= 0 && pos.top >= 0 && pos.top - threshold - pos.viewportHeight > pos.elementHeight;
        },
        leftOfViewportPartly: function leftOfViewportPartly(element, i, meta) {
            var param = (meta[3] || '').split(','),
                threshold = param[0] && (param[0] = param[0].trim()) ? parseInt(param[0], 10) : 0,
                viewport = param[1] && (param[1] = param[1].trim()) ? $(param[1])[0] || undefined : undefined,
                pos = getRelativePosition(element, viewport || getScrollableParent(element));

            return pos.left - threshold <= 0 && pos.right >= 0 && pos.left - threshold - pos.viewportWidth > pos.elementWidth;
        },
        rightOfViewportPartly: function rightOfViewportPartly(element, i, meta) {
            var param = (meta[3] || '').split(','),
                threshold = param[0] && (param[0] = param[0].trim()) ? parseInt(param[0], 10) : 0,
                viewport = param[1] && (param[1] = param[1].trim()) ? $(param[1])[0] || undefined : undefined,
                pos = getRelativePosition(element, viewport || getScrollableParent(element));

            return pos.right - threshold <= 0 && pos.left >= 0 && pos.right - threshold - pos.viewportWidth > pos.elementWidth;
        },
        exceedsViewport: function exceedsViewport(element, i, meta) {
            var param = (meta[3] || '').split(','),
                threshold = param[0] && (param[0] = param[0].trim()) ? parseInt(param[0], 10) : 0,
                viewport = param[1] && (param[1] = param[1].trim()) ? $(param[1])[0] || undefined : undefined;

            return !_inViewport(element, threshold, viewport || getScrollableParent(element));
        },
        exceedsViewportVertical: function exceedsViewportVertical(element, i, meta) {
            var param = (meta[3] || '').split(','),
                threshold = param[0] && (param[0] = param[0].trim()) ? parseInt(param[0], 10) : 0,
                viewport = param[1] && (param[1] = param[1].trim()) ? $(param[1])[0] || undefined : undefined,
                pos = getRelativePosition(element, viewport || getScrollableParent(element));

            return pos.top - threshold < 0 && pos.bottom - threshold < 0;
        },
        exceedsViewportHorizontal: function exceedsViewportHorizontal(element, i, meta) {
            var param = (meta[3] || '').split(','),
                threshold = param[0] && (param[0] = param[0].trim()) ? parseInt(param[0], 10) : 0,
                viewport = param[1] && (param[1] = param[1].trim()) ? $(param[1])[0] || undefined : undefined,
                pos = getRelativePosition(element, viewport || getScrollableParent(element));

            return pos.left - threshold < 0 && pos.right - threshold < 0;
        }
    });
})(jQuery);