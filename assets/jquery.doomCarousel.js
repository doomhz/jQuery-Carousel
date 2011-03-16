/**
* Doom Carousel
*
* A sliding carousel for images.
*
* @author Dumitru Glavan
* @link http://dumitruglavan.com
* @version 1.1
* @requires jQuery v1.3.2 or later
*
* Examples and documentation at: http://dumitruglavan.com/jquery-doom-carousel-plugin/
* Official jQuery plugin page: http://plugins.jquery.com/project/doom-carousel
* Find source on GitHub: https://github.com/doomhz/jQuery-Carousel
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*
*/
;(function ($) {
	$.fn.doomCarousel = function (options) {
		this.config = {leftBtn:'a.doom-carousel-left-btn',
					   rightBtn:'a.doom-carousel-right-btn',
					   imgList:'ul.doom-carousel-list',
					   imgListCnt: 'div.doom-carousel-cnt',
					   transitionType:'slide',
					   slideSpeed:'800',
					   easing:'swing',
					   autoSlide:true,
					   slideDuration:3000,
					   imgWidth:0,
					   showNav:true,
					   showCaption:true,
					   onLoad:null
					  };
		$.extend(this.config, options);

		var self = this;
		var $self = $(this);

		if (this.config.showNav) {
			this.leftBtn = $(this.config.leftBtn + ':first', $self);
			this.rightBtn = $(this.config.rightBtn + ':first', $self);
			this.leftBtn.click(function () {
				if (self.slideInterval) {clearInterval(self.slideInterval);}
				self.slideCarousel('left');
				self.setSlideInterval();
				return false;
			});

			this.rightBtn.click(function () {
				if (self.slideInterval) {clearInterval(self.slideInterval);}
				self.slideCarousel('right');
				self.setSlideInterval();
				return false;
			});
		} else {
			$(this.config.leftBtn, $self).remove();
			$(this.config.rightBtn, $self).remove();
		}

		this.imgListCnt = $(this.config.imgListCnt + ':first', $self);
		this.imgList = $(this.config.imgList + ':first', $self);

		var totalImages = $('li', $self);
		this.config.imgWidth = this.config.imgWidth || totalImages.width();
		this.imgList.width(totalImages.length * this.config.imgWidth);

		if (this.config.showCaption) {
			this.imgLinks = $('a', self.imgListCnt);
			this.imgLinks.each(function (index, el) {
				var title = $(el).attr('title').replace('{#', '<').replace('#}', '>').replace('!#', '"');
				$(el).attr('title', title.replace(/(<([^>]+)>)/ig,""));
				$('<div class="doom-pic-title">' + title + '</div>').appendTo(el);
			});
		}

		self.setSlideInterval();

		$.isFunction(this.config.onLoad) && this.config.onLoad(this);

		return this;
	},

	$.fn.slideCarousel = function (to) {
		var self = this;
		var $imgListCnt = self.imgListCnt;
		
		to = typeof(to) !== 'string' ? 'right' : to;
		to = to === 'left' ? '-' : '+';
		var moveSize = (self.imgList.width() === ($imgListCnt.scrollLeft() + self.config.imgWidth)) ? 0 : self.config.imgWidth;

		switch (self.config.transitionType) {
			case 'slide':
				moveSize = moveSize ? to + '=' + moveSize : moveSize;
				$imgListCnt.animate({'scrollLeft':moveSize}, self.config.slideSpeed, self.config.easing);
				break;
			case 'fade':
				moveSize = moveSize ? $imgListCnt.scrollLeft() + ~~(+ (to + moveSize)) : moveSize;
				self.imgList.fadeTo(self.config.easing, 0, function () {$imgListCnt.scrollLeft(moveSize);self.imgList.fadeTo(self.config.easing, 1)});
				break;
			default:
				moveSize = moveSize ? $imgListCnt.scrollLeft() + ~~(+ (to + moveSize)) : moveSize;
				$imgListCnt.scrollLeft(moveSize);
				break;
		}
	},

	$.fn.setSlideInterval = function () {
		if (this.config.autoSlide) {
			var self = this;
			self.slideInterval = setInterval(function () {self.slideCarousel('right');}, self.config.slideDuration);
		}
	}
})(jQuery);