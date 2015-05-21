/**
 * bs-notifier.js
 */
(function (factory) {
	if (typeof exports === 'object') {
        factory(require('jquery'));
	} else if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else {
		factory(jQuery);
	}
}(function ($) {
	var pluginName = "notifier",
		defaults = {
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

	function Notifier(element, options) {
		this.element = element;
		this.options = $.extend(true, {}, defaults, options);

		this._defaults = defaults;
		this._name = pluginName;

		this.alertBox = '<div class="alert" role="alert"></div>';
		this.closeBox = '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';

		return this;
	}

	Notifier.prototype = {
		show: function (options) {
			if (typeof options == 'string') options = {message: options};

			var opt = $.extend(true, {}, this.options, options),
				$alertBox = $(this.alertBox).addClass('alert-' + opt.type),
				icon = null;

			if (!opt.message.match(/<[a-z][^>]*>/i)) {
				opt.message = opt.message.replace(/\n/g, '<br>');
			}

			$alertBox.addClass('alert-dismissible').append(this.closeBox);
			if (opt.fade) {
				$alertBox.addClass('fade in');
			}

			if (opt.useIcon) {
				var iconType = opt.icons[opt.type] || '';

				icon = opt.iconTemplate.replace(/\{\{icon\}\}/, iconType) + ' ';
			}
			if (opt.title) {
				$titleBox = $('<' + opt.titleTag + ' />').addClass(opt.titleClass).html(opt.title);
				if (icon) {
					$titleBox.prepend(icon);
					icon = null;
				}
				$alertBox.append($titleBox);
			}
			$alertBox.append((icon ? icon : '') + opt.message);

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
	};

	$.fn[pluginName] = function (options) {
		// uses `.get(0)` to ensure that the plugin is bound to a single container element.
		return new Notifier(this.get(0), options);
	};
}));