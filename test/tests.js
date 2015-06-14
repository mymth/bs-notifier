var expect = chai.expect;

describe('bs-notify', function () {
	var $test = $('#test');

	describe('plugin function', function () {
		var notifier;

		it('should create a new instance and return it', function () {
			var expected = $.data($test.get(0), 'notifier');

			expect(expected).to.be.undefined;

			notifier = $test.notifier();
			expected = $.data($test.get(0), 'notifier');
			expect(expected).to.be.an('object');
			expect(notifier).to.equal(expected);
		});

		it('should return the existing one if an instance already exists', function () {
			expect($test.notifier()).to.equal(notifier);
		});

		it('should initialize the existing one and return it if an instance exists and options are given', function () {
			var newNotifier = $test.notifier({useIcon: false});

			expect(newNotifier).to.equal(notifier);
			expect(newNotifier.options.useIcon).to.be.false;
		});
	});

	describe('#destroy()', function () {
		it('should remove plugin from element', function () {
			var notifier = $test.notifier();
			notifier.destroy();
			expect($.data($test.get(0), 'notifier')).to.be.undefined;
		});
	});

	describe('#show()', function () {
		var buttonHtml = '<button type="button" class="close" data-dismiss="alert">' +
				'<span aria-hidden="true">×</span><span class="sr-only">Close</span>' +
				'</button>',
			fadeSpeed = 250,
			notifier, $alert, expectedHtml;

		this.timeout(5000);

		before(function () {
			notifier = $test.notifier();
		});

		afterEach(function (done) {
			setTimeout(function () {
				done();
			}, fadeSpeed);
		});

		it('should show a success alert box that auto-closes in 3 sec by default', function (done) {
			notifier.show('lorem ipsum');
			$alert = $test.find('.alert');
			expectedHtml = buttonHtml + '<i class="glyphicon glyphicon-ok-sign"></i> lorem ipsum';

			expect($alert.length).to.equal(1);
			expect($alert.hasClass('alert-success')).to.be.true;
			expect($alert.hasClass('fade in')).to.be.true;
			expect($alert.html()).to.equal(expectedHtml);
			setTimeout(function () {
				expect($test.find('.alert').length).to.equal(1);
				setTimeout(function () {
					expect($test.find('.alert').length).to.equal(0);
					done();
				}, 1000 + fadeSpeed);
			}, 2000);
		});

		it('should show alert with optional auto-close duration', function (done) {
			notifier.show({message: 'test', duration: 1000});
			$alert = $test.find('.alert');

			setTimeout(function () {
				expect($test.find('.alert').length).to.equal(1);
				setTimeout(function () {
					expect($test.find('.alert').length).to.equal(0);
					done();
				}, 500 + fadeSpeed);
			}, 500);
		});

		it('should show alert with turning auto-closing off', function (done) {
			notifier.show({message: 'test', autoClose: false});
			$alert = $test.find('.alert');

			setTimeout(function () {
				expect($test.find('.alert').length).to.equal(1);
				$alert.alert('close');
				setTimeout(function () {
					expect($test.find('.alert').length).to.equal(0);
					done();
				}, fadeSpeed);
			}, 3000 + fadeSpeed);
		});

		it('should show alert with other alert type', function () {
			notifier.show({message: 'test', type: 'danger'});
			$alert = $test.find('.alert.alert-danger');
			expectedHtml = buttonHtml + '<i class="glyphicon glyphicon-remove-sign"></i> test';

			expect($alert.html()).to.equal(expectedHtml);
			$alert.alert('close');
		});

		it('should show alert with optional icon class', function () {
			notifier.show({
				message: 'test',
				type: 'warning',
				icons: {warning: 'icon-warning'}
			});
			$alert = $test.find('.alert.alert-warning');
			expectedHtml = buttonHtml + '<i class="icon-warning"></i> test';

			expect($alert.html()).to.equal(expectedHtml);
			$alert.alert('close');
		});

		it('should show alert with optional icon template', function () {
			notifier.show({
				message: 'test',
				type: 'info',
				icons: {info: 'info.jpg'},
				iconTemplate: '<img src="{{icon}}">'
			});
			$alert = $test.find('.alert.alert-info');
			expectedHtml = buttonHtml + '<img src="info.jpg"> test';

			expect($alert.html()).to.equal(expectedHtml);
			$alert.alert('close');
		});

		it('should show alert without icon', function () {
			notifier.show({message: 'test', useIcon: false});
			$alert = $test.find('.alert');
			expectedHtml = buttonHtml + 'test';

			expect($alert.html()).to.equal(expectedHtml);
			$alert.alert('close');
		});

		it('should show alert with title (icon comes in the title instead of message body)', function () {
			notifier.show({
				title: 'test',
				message: 'lorem ipsum',
				icons: {success: 'icon-test'}
			});
			$alert = $test.find('.alert');
			expectedHtml = buttonHtml + '<h4 class="alert-title"><i class="icon-test"></i> test</h4>lorem ipsum';

			expect($alert.html()).to.equal(expectedHtml);
			$alert.alert('close');
		});

		it('should show alert with optional title tag and class', function () {
			notifier.show({
				title: 'test',
				message: 'lorem ipsum',
				useIcon: false,
				titleTag: 'div',
				titleClass: 'title-class'
			});
			$alert = $test.find('.alert');
			expectedHtml = buttonHtml + '<div class="title-class">test</div>lorem ipsum';

			expect($alert.html()).to.equal(expectedHtml);
			$alert.alert('close');
		});

		it('should alert with turning animation off', function () {
			notifier.show({message: 'test', fade: false});
			$alert = $test.find('.alert');

			expect($alert.hasClass('fade in')).to.be.false;
			$alert.alert('close');
		});

		it('should show alert with custom onClose/onClosed handlers', function (done) {
			notifier.show({
				message: 'test',
				fade: false,
				onClose: function (e) {
					e.stopPropagation();
					$test.append('<p id="msg">closing</p>');
				},
				onClosed: function (e) {
					setTimeout(function () {
						$('#msg').text('closed');
					}, 100);
				}
			});
			$test.find('.alert').find('button.close').trigger('click');

			var $msg = $('#msg');
			expect($msg.text()).to.equal('closing');
			setTimeout(function () {
				expect($msg.text()).to.equal('closed');
				$msg.remove();
				done();
			}, 100);
		});

		it('should convert "\\n" to "<br>" if the message is plain text', function () {
			notifier.show({
				message: 'test\nlorem ipsum\ndolor sit amet',
				useIcon: false
			});
			$alert = $test.find('.alert');
			expectedHtml = buttonHtml + 'test<br>lorem ipsum<br>dolor sit amet';

			expect($alert.html()).to.equal(expectedHtml);
			$alert.alert('close');

			setTimeout(function () {
				notifier.show({
					message: '<b>lorem ipsum</b><br>\ndolor sit amet',
					useIcon: false
				});
				$alert = $test.find('.alert');
				expectedHtml = buttonHtml + '<b>lorem ipsum</b><br>\ndolor sit amet';

				expect($alert.html()).to.equal(expectedHtml);
				$alert.alert('close');
			}, fadeSpeed);
		});
	});
});
