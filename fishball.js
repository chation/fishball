/**
 * Created by Chation on 2016/12/22.
 */
var box = document.getElementById("right_col_peck");
var textbox = document.getElementsByClassName('cs-textarea')[0];
var submit_text = document.getElementsByClassName('b-btn')[0];
var fish_num = document.getElementsByClassName("y1 fl")[0].querySelectorAll("em")[0];
function xxxx(){
	box.click();
}
var i=15;
var t=setInterval(function(){
	if (i == 0) { 
		clearInterval(t);
	} 
	textbox.value = '6666' + i; 
	submit_text.click(); 
	i--;
}, 10000);
t;
setInterval("xxxx()",50);
var ss=fish_num.innerHTML;
document.onkeydown=function(event){
	var keyplay=event||window.event||arguments.callee.caller.arguments[0];
	if(keyplay && keyplay.keyCode==86){
		var ss1=fish_num.innerHTML;
		var numyw=ss1-ss;
        alert("哇哦~你在这个房间抢到了 "+numyw+" 个鱼丸呢~!");
	}
};
