(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(factory(global.$));
}(this, (function ($) { 'use strict';

$ = 'default' in $ ? $['default'] : $;

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/**
 * bs-notifier.js
 */
var pluginName = "notifier";
var defaults$$1 = {
  title: null,
  message: null,
  type: 'success',
  useIcon: true,
  icons: {
    success: 'glyphicon glyphicon-ok-sign',
    info: 'glyphicon glyphicon-info-sign',
    warning: 'glyphicon glyphicon-exclamation-sign',
    danger: 'glyphicon glyphicon-remove-sign'
  },
  iconTemplate: '<i class="{{icon}}"></i>',
  titleTag: 'h4',
  titleClass: 'alert-title',
  fade: true,
  autoClose: true,
  duration: 3000,
  onClose: null,
  onClosed: null
};

var Notifier = function () {
  function Notifier(element, options) {
    classCallCheck(this, Notifier);

    this.element = element;
    this._defaults = defaults$$1;
    this._name = pluginName;

    this.alertBox = '<div class="alert" role="alert"></div>';
    this.closeBox = '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';

    return this.init(options);
  }

  createClass(Notifier, [{
    key: 'init',
    value: function init(options) {
      this.options = $.extend(true, {}, defaults$$1, options);

      return this;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      $.removeData(this.element, pluginName);
    }
  }, {
    key: 'show',
    value: function show(options) {
      if (typeof options == 'string') {
        options = { message: options };
      }

      var opt = $.extend(true, {}, this.options, options);
      var $alertBox = $(this.alertBox).addClass('alert-' + opt.type);
      var icon = '';

      if (!opt.message.match(/<[a-z][^>]*>/i)) {
        opt.message = opt.message.replace(/\n/g, '<br>');
      }

      $alertBox.addClass('alert-dismissible').append(this.closeBox);
      if (opt.fade) {
        $alertBox.addClass('fade in');
      }

      if (opt.useIcon) {
        icon = opt.iconTemplate.replace(/\{\{icon\}\}/, opt.icons[opt.type] || '');
      }
      if (opt.title) {
        var $titleBox = $('<' + opt.titleTag + ' />').addClass(opt.titleClass).html(opt.title);

        if (icon) {
          $titleBox.prepend(icon + ' ');
          icon = '';
        }
        $alertBox.append($titleBox);
      }
      $alertBox.append((icon + ' ' + opt.message).trim());

      if (typeof opt.onClose == 'function') {
        $alertBox.on('close.bs.alert', opt.onClose);
      }
      if (typeof opt.onClosed == 'function') {
        $alertBox.on('closed.bs.alert', opt.onClosed);
      }

      $alertBox.appendTo(this.element).alert();

      if (opt.autoClose) {
        setTimeout(function () {
          $alertBox.alert('close');
        }, opt.duration);
      }
    }
  }]);
  return Notifier;
}();

$.fn[pluginName] = function (options) {
  var element = this.get(0); // to ensure that the plugin is bound to a single container element.
  var plugin = $.data(element, pluginName);

  if (!plugin) {
    plugin = $.data(element, pluginName, new Notifier(element, options));
  } else if (options) {
    plugin.init(options);
  }

  return plugin;
};

})));
