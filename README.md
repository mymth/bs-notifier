# bs-notifier

Growl-like notification plugin using Twitter Bootsrap's alert component. The project originally started to extend [bootstrap-notify](https://github.com/goodybag/bootstrap-notify). Therefore, the plugin works pretty much the same as bootstrap-notify.

## Usage

### HTML

Add a container element with a position indicator class in your html.

```html
<div class="notifications top-right"></div>
```

Available position indicator classes are `.top-right`, `.top-left`, `.bottom-right` and `.bottom-left`.

### JavaScript

Initialize the plugin with the `notify()` method, then display a notification using the `show()` method.

```javascript
$('.notifications.top-right').notify({
	message: 'Hello world!'
}).show();
```

Or create a plugin instance first, then reuse it to display multiple notifications.

```javascript
var notifier = $('.notifications.top-right').notify({
	// ...custom default options
});

notifier.show({
	type: 'info',
	message: 'Hello again!',
	// ...custum options for this notification
});

notifier.show({
	type: 'warning',
	title: 'Watch out!',
	message: 'She will chew you up.'
});
```

Also, you can simply pass a message text (or html) to show a notification with the default options.

```javascript
notifier.show('Lorem ipsum dolor sit amet...');
```

## Options

##### type
Notification type corresponding to `.alert-` contextual class. `success`, `info`, `warning` and `danger` are available.
> Default: `'success'`

##### title
Title text/html of the notification. This option is not set by default.

##### message
Text/html for the body of the notification. This option is not set by default. You need to set this option every time you show a new notification.

##### useIcon
Whether to display an icon at the begining of the title (or the body when the title is omitted).
> Default: `true`

##### icons
Set of icon-classes used for each nortification type.
> Default:
> `{`  
> `  success: 'glyphicon glyphicon-ok-sign',`  
> `  info: 'glyphicon glyphicon-info-sign',`  
> `  warning: 'glyphicon glyphicon-exclamation-sign',`  
> `  danger: 'glyphicon glyphicon-remove-sign'`  
> `}`

##### icon
Css class for icon. This option is not set by default. Use this option when you want to use one-time custom icon for a particular notification.

##### iconTemplate
Icon tag template. The plugin replaces the string `{{icon}}` in the template with the icon class chosen from the `icons` option or given as the `icon` option.
> Default: `'<i class="{{icon}}"></i>'`

##### titleTag
HTML tag for the title block.
> Default: `'h4'`

##### titleClass
CSS class for the title block.
> Default: `'alert-title'`

##### fade
Whether to perform fade-out animation.
> Default: `true`

##### autoClose
Whether to close notification automatically after the time set to the `duration` option.
> Default: `true`

##### duration
Milliseconds to auto-close notification.
> Default: `3000`

##### onClose
Event handler for `close.bs.alert` event.
> Default: `null`

>Note: Since Bootstrap fires close event twice when notification has `.fade.in` class, you need to set `false` to the `fade` option when you use this option.

##### onClosed
Event handler for `closed.bs.alert` event.
> Default: `null`
