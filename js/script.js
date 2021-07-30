// 禁止鼠标右键代码
if (window.Event)
	document.captureEvents(Event.MOUSEUP);

function nocontextmenu() {
	event.cancelBubble = true
	event.returnValue = false;
	return false;
}

function norightclick(e) {
	if (window.Event) {
		if (e.which == 2 || e.which == 3)
			return false;
	} else
	if (event.button == 2 || event.button == 3) {
		event.cancelBubble = true
		event.returnValue = false;
		return false;
	}
}
document.oncontextmenu = nocontextmenu; // for IE5+
document.onmousedown = norightclick; // for all others

// 禁止拖拽图片
document.ondragstart = function() {
	return false;
};






window.onscroll = function() {
	var topScroll = get_scrollTop_of_body();
	var backTop = document.getElementById('backtop');
	if (topScroll > 100) {
		backTop.style.transform = 'translateY(0px)';
		backTop.style.opacity = '1';
	} else {
		backTop.style.transform = 'translateY(80px)';
		backTop.style.opacity = '0';
	}
}

/*解决浏览器兼容问题*/
function get_scrollTop_of_body() {
	var scrollTop;
	if (typeof window.pageYOffset != 'undefined') { //pageYOffset指的是滚动条顶部到网页顶部的距离
		scrollTop = window.pageYOffset;
	} else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
		scrollTop = document.documentElement.scrollTop;
	} else if (typeof document.body != 'undefined') {
		scrollTop = document.body.scrollTop;
	}
	return scrollTop;
}