// 禁止鼠标右键代码
// if (window.Event)
// 	document.captureEvents(Event.MOUSEUP);

// function nocontextmenu() {
// 	event.cancelBubble = true
// 	event.returnValue = false;
// 	return false;
// }

// function norightclick(e) {
// 	if (window.Event) {
// 		if (e.which == 2 || e.which == 3)
// 			return false;
// 	} else
// 	if (event.button == 2 || event.button == 3) {
// 		event.cancelBubble = true
// 		event.returnValue = false;
// 		return false;
// 	}
// }
// document.oncontextmenu = nocontextmenu; // for IE5+
// document.onmousedown = norightclick; // for all others

// 禁止拖拽图片
document.ondragstart = function() {
	return false;
};






window.onscroll = function() {
	var topScroll = get_scrollTop_of_body();
	var backTop = document.getElementById('backtop');
	if (topScroll > 400) {
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


// 页面内点击滚动到某个位置
var showBookmark = (function() {
	var _useHash, _scrollX, _scrollY, _nodeX, _nodeY, _itFrame, _scrollId = -1,
		_bookMark, _isBot,
		/*
		 * nDuration: 每帧持续时间
		 * nFrames: 每次滚动持续帧数
		 */
		nDuration = 200,
		nFrames = 10;

	function _next() {
		if (_itFrame > nFrames) {
			clearInterval(_scrollId);
			_scrollId = -1;
			return;
		}
		_isBot = true;
		document.documentElement.scrollTop = Math.round(_scrollY + (_nodeY - _scrollY) * _itFrame / nFrames);
		document.documentElement.scrollLeft = Math.round(_scrollX + (_nodeX - _scrollX) * _itFrame /
			nFrames);
		if (_useHash && _itFrame === nFrames) {
			location.hash = _bookMark;
		}
		_itFrame++;
	}

	function _chkOwner() {
		if (_isBot) {
			_isBot = false;
			return;
		}
		if (_scrollId > -1) {
			clearInterval(_scrollId);
			_scrollId = -1;
		}
	}

	if (window.addEventListener) {
		window.addEventListener("scroll", _chkOwner, false);
	} else if (window.attachEvent) {
		window.attachEvent("onscroll", _chkOwner);
	}

	return function(sBookmark, bUseHash) {
		_scrollY = document.documentElement.scrollTop;
		_scrollX = document.documentElement.scrollLeft;
		_bookMark = sBookmark;
		_useHash = arguments.length === 1 || bUseHash;
		for (
			var nLeft = 0, nTop = 0, oNode = document.querySelector(sBookmark); oNode; nLeft += oNode
			.offsetLeft, nTop += oNode.offsetTop, oNode = oNode.offsetParent
		);
		_nodeX = nLeft, _nodeY = nTop, _itFrame = 1;
		if (_scrollId === -1) {
			_scrollId = setInterval(_next, Math.round(nDuration / nFrames));
		}
	};
})();



// 禁止双指放大
document.documentElement.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}, false);

// 禁止双击放大
var lastTouchEnd = 0;
document.documentElement.addEventListener('touchend', function (event) {
  var now = Date.now();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);