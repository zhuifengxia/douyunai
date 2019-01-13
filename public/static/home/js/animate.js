$(function() {
	var item = $(".items.items-steps"),
		ani_item = item.find(".animated");
	console.log(item);
	$(window).on("scroll load", function() {
		var scrollTop = $(document).scrollTop();
		var h = $(window).height();
		ani_item.each(function() {
			var itemToTop = $(this).offset().top;
			var itemH = $(this).outerHeight();
			var ani_name = $(this).attr("ani-name"),
				ani_delay = $(this).attr("ani-delay"),
				ani_duration = $(this).attr("ani-duration");
			if(scrollTop + h >= $(this).parent().offset().top + (itemH / 3)) {
				$(".items-steps .items-block").find(this).removeClass("hidden").addClass(ani_name).css({
					"animation-delay": ani_delay,
					"animation-duration": ani_duration
				});
			}
			if(scrollTop + h >= itemToTop + (itemH / 3)) {
				$(this).removeClass("hidden").addClass(ani_name).css({
					"animation-delay": ani_delay,
					"animation-duration": ani_duration
				});
			}
		});
	});
	$(".items-steps .item").on("mouseenter", function() {
		$(this).addClass("cur").siblings(".item").removeClass("cur");
		$(".items-steps .step").eq($(this).index()).addClass("cur").siblings(".step").removeClass("cur");
	});
	$(".items-steps .item").on("mouseleave", function() {
		$(".items-steps .item").removeClass("cur");
		$(".items-steps .step").removeClass("cur");
	});
})