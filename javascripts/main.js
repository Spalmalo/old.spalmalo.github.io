$(document).ready(function() {
	svg4everybody();

	FastClick.attach(document.body);

	$('.content-wrapper table').basictable({baseClass: 'table'});

	// Paralax background
	var $window = $(window);
	$('[data-paralax-type="background"]').each(function(){
		var $bgobj = $(this);

		$(window).scroll(function() {
			var yPos = -($window.scrollTop() / $bgobj.data('paralax-speed'));
			var coords = '50% '+ yPos + 'px';
			$bgobj.css({
				backgroundPosition: coords
			});
		});
	});

	// Wrap all words by span
	// var $text = $('.js-span-wrap');
	// $text.each(function(){
	// 	var $that = $(this);
	// 	if (!$that.hasClass('js-span-wrap_inited')) {
	// 		var words = $that.text().replace(/ +(?= )/g,'').split(" ");
	// 		$that.empty();
	// 		$.each(words, function(i, v) {
	// 			$that.append($("<span>").text(v));
	// 		});
	// 		$that.addClass('js-span-wrap_inited');
	// 	}
	// });

	// Here insert modules scripts
	$('.browsehappy').click(function() {
		$(this).slideUp();
	});
	
	
	
	var setFormFieldFocus = function(block, control) {
		var $control = $('.' + block + '__' + control);
	
		$control.focusin(function(event) {
			$(this).parents('.' + block).addClass(block + '_focused');
		});
	
		$control.focusout(function(event) {
			$(this).parents('.' + block).removeClass(block + '_focused');
		});
	};
	
	
	setFormFieldFocus('select', 'control');
	setFormFieldFocus('input', 'control');
	setFormFieldFocus('textarea', 'control');
	
	
	$('.menu-trigger').click(function(event) {
		var $page = $('.page');
		var $trigger = $(this);
		var $overlay = $page.elem('overlay');
	
		$trigger.ctx('menu-trigger').mod('active', true);
		$page.ctx('page').mod('menu', 'open');
	
	});
	
	
	$('.mobile-menu').each(function(index, el) {
		var $that = $(this);
		var $close = $that.elem('close');
		var $page = $('.page');
	
		$close.click(function(event) {
			if ($page.hasMod('menu', 'open')) {
				event.preventDefault();
				$page.ctx('page').mod('menu', false);
			}
		});
	});
	
	
	// Remodal init
	$('[data-remodal-id]').remodal();
	
	
	$('.page').each(function(index, el) {
		$page = $(this);
		$overlay = $page.elem('overlay');
	
		$overlay.on('click', function(event) {
			event.preventDefault();
			if ($page.hasMod('menu', 'open')) {
				$page.mod('menu', false);
			}
		});
	});
	

});
