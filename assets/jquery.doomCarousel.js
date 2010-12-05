/**
* Doom Carousel
*
* A sliding carousel for images.
*
* @author Dumitru Glavan
* @version 1.0
* @requires jQuery v1.3.2 or later
*
* Examples and documentation at: https://github.com/doomhz/jQuery-Carousel
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*
*/
;(function ($) {
	$.fn.doomCarousel = function (options) {
		this.config = {
					  };
		$.extend(this.config, options);

		return this;
	}
})(jQuery);