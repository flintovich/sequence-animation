/*
 * jQuery Sequence Animation plugin
 */
(function ($) {
	function SequenceAnimation(options) {
		this.options = $.extend({
			animateStartClass: 'go',
			dataAnimCount: 'anim-count',
			dataDuration: 'anim-duration',
			dataAnimType: 'anim-type',
			durationDefault: 1000,
			screenDivision: 4
		}, options);
		this.init();
	}

	SequenceAnimation.prototype = {
		init: function () {
			this.findElements();
			this.scrollEvent();
		},
		findElements: function () {
			this.holder = this.options.holder;
		},
		scrollEvent: function () {
			var self = this;
			var section = $(this.holder);
			var count = 1;
			var win = $(window);
			var animationCall = function () {
				if (section.offset().top - win.scrollTop() <= win.height() / self.options.screenDivision ||
					section.offset().top + section.outerHeight(true) - win.scrollTop() - 1 <= win.height()) {
					section.addClass(self.options.animateStartClass);
					self.checkAnimation(section, count);
					win.off('scroll', animationCall);
				}
			};
			win.on('scroll load', animationCall);
		},
		checkAnimation: function (section, number) {
			var element = section.find('[data-' + this.options.dataAnimCount + ' = ' + number + ']'),
				self = this,
				duration,
				obj;

			element.each(function () {
				var item = jQuery(this);
				// duration
				if (item.data(self.options.dataDuration)) {
					duration = item.data(self.options.dataDuration)
				} else {
					duration = self.options.durationDefault;
				}

				// animate type
				switch (item.data(self.options.dataAnimType)) {
					case 'fade-up':
						obj = {
							opacity: 1,
							top: 0
						};
						break;
					case 'fade-down':
						obj = {
							opacity: 1,
							bottom: 0
						};
						break;
					case 'fade-left':
						obj = {
							opacity: 1,
							left: 0
						};
						break;
					case 'fade-right':
						obj = {
							opacity: 1,
							right: 0
						};
						break;
					default :
						obj = {
							opacity: 1
						};
				}
				self.applyAnimation(item, obj, duration, section, number);
			});
		},
		applyAnimation: function (element, animObj, duration, section, number) {
			var self = this;
			element.animate(animObj, {
				duration: duration,
				complete: function () {
					number++;
					self.checkAnimation(section, number);
				}
			});
		}
	};

	// jquery plugin
	$.fn.sequenceAnimation = function (opt) {
		return this.each(function () {
			$(this).data('SequenceAnimation', new SequenceAnimation($.extend(opt, {holder: this})));
		});
	};
})(jQuery);
