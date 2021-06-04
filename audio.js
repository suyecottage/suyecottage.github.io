$(function() {
	$(".js-range-slider").ionRangeSlider({ //实例化 滑块
		hide_min_max: true, //隐藏最大最小
		hide_from_to: true, //隐藏当前数值
		min: 0,
		max: 100, //最大值最小值
		from: 50, //初始值
		onChange: function(e) {
			let val = e.from / 100; //audio原生的volume范围为 0 ~ 1
			e.input[0].parentNode.parentNode.childNodes[3].volume = val
		}
	})
	$('.audio').on('click', function(e) {
		if (e.target.localName !== 'i' && e.target.localName !== 'span') { //处理时间冒泡
			if (this.childNodes[1].childNodes[3].paused) {
				console.log(this.childNodes[1].childNodes[5].childNodes[3])
				this.childNodes[1].childNodes[5].childNodes[3].setAttribute('class', 'irs irs--flat range_active')
				this.childNodes[1].childNodes[1].setAttribute('class', 'img_active')
				this.childNodes[1].childNodes[5].setAttribute('class', 'audio_item_title audio_item_title_active')
				this.childNodes[1].childNodes[3].volume = 0.5
				this.childNodes[1].childNodes[3].play()
			} else {
				this.childNodes[1].childNodes[5].childNodes[3].setAttribute('class', 'irs irs--flat')
				this.childNodes[1].childNodes[1].setAttribute('class', '')
				this.childNodes[1].childNodes[5].setAttribute('class', 'audio_item_title')
				this.childNodes[1].childNodes[3].currentTime = 0
				this.childNodes[1].childNodes[3].pause()
			}
		}
	})
})



//监听加载状态改变
document.onreadystatechange = completeLoading;
//加载状态为complete时移除loading效果
function completeLoading() {
if (document.readyState == "complete") {
$("#loading").animate({
"opacity": "0"
}, 500).hide(1000);
}
}

