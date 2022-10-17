(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.$));
})(this, (function ($) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var $__default = /*#__PURE__*/_interopDefaultLegacy($);

  /**
   * bs-notifier.js
   */

  const pluginName = "notifier";
  const defaults = {
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

  class Notifier {
    constructor(element, options) {
      this.element = element;
      this._defaults = defaults;
      this._name = pluginName;

      this.alertBox = '<div class="alert" role="alert"></div>';
      this.closeBox = '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';

      return this.init(options);
    }

    init(options) {
      this.options = $__default["default"].extend(true, {}, defaults, options);

      return this;
    }

    destroy() {
      $__default["default"].removeData(this.element, pluginName);
    }

    show(options) {
      if (typeof options == 'string') {
        options = {message: options};
      }

      const opt = $__default["default"].extend(true, {}, this.options, options);
      const $alertBox = $__default["default"](this.alertBox).addClass(`alert-${opt.type}`);
      let icon = '';

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
        const $titleBox = $__default["default"](`<${opt.titleTag} />`).addClass(opt.titleClass).html(opt.title);

        if (icon) {
          $titleBox.prepend(`${icon} `);
          icon = '';
        }
        $alertBox.append($titleBox);
      }
      $alertBox.append(`${icon} ${opt.message}`.trim());

      if (typeof opt.onClose == 'function') {
        $alertBox.on('close.bs.alert', opt.onClose);
      }
      if (typeof opt.onClosed == 'function') {
        $alertBox.on('closed.bs.alert', opt.onClosed);
      }

      $alertBox.appendTo(this.element).alert();

      if (opt.autoClose) {
        setTimeout(() => {
          $alertBox.alert('close');
        }, opt.duration);
      }
    }
  }

  $__default["default"].fn[pluginName] = function (options) {
    const element = this.get(0);  // to ensure that the plugin is bound to a single container element.
    let plugin = $__default["default"].data(element, pluginName);

    if (!plugin) {
      plugin = $__default["default"].data(element, pluginName, new Notifier(element, options));
    } else if (options) {
      plugin.init(options);
    }

    return plugin;
  };

}));
