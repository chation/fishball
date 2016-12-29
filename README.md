###起因
前几日,斗鱼TV某当红主播一晚上共收获多达400多个火箭,和小伙伴坐在电脑前面一直单击鼠标,抢的不亦乐乎,突发奇想,以脚本方式取代单一的点击过程（.click()）。

###最初模型
通过浏览器开发者工具（F12），获取到鱼丸宝箱的id属性："right_col_peck";
试着写出如下代码:
```javascript
function user_click(){
	document.getElementById("right_col_peck").click();
}
setInterval("user_click()",500);
```
通过创建一个名为"user_click()"的函数实现点击id为"right_col_peck"的元素一次,也就是点击宝箱一次,然后设置一个计时器setInterval()实现,每0.5秒执行一次"user_click()"函数,即这段代码实现了,每隔0.5秒点击鱼丸宝箱一次。虽然比较粗暴,但是证明实用性还是挺强的。

###添加发送弹幕功能
之所以要添加发送弹幕的功能，是因为鱼丸宝箱上显示了提示，多发弹幕可以增加抢到鱼丸的概率，虽然我们的脚本能实现一直点击宝箱，但是比不过别人一直刷“66666”的水友啊。于是，作好了添加发送弹幕的功能的准备！

首先，还是通过浏览器开发者工具（F12），查找到输入弹幕的元素是一个< textarea >，它有一个class属性“cs-textarea”，通过测试发现拥有这个class属性的元素只有它一个。然后是发送弹幕按钮的元素，它是一个class为“b-btn”的元素，同样拥有这个class属性的元素也只有它一个。这样，找到了输入框和发送按钮，我们的脚本就可以开始写了~！
（通过document.getElementsByClassName()找到的元素是一个数组,需要索引值才能定位到那个元素。）

这里，我们的需求是，每隔11秒发送一次"66666"的弹幕，共发送15次。于是，试着写出如下代码：
```javascript
var i=15;
var t=setInterval(function(){
	if (i == 0) { 
		clearInterval(t);
	} 	
	document.getElementsByClassName('cs-textarea')[0].value = '6666' + i; 
	document.getElementsByClassName('b-btn')[0].click(); 
	i--;
}, 11000);
t;
```
经过在某个斗鱼房间测试后，发现脚本是可行的，从“666615”一直发送到“66661” 。

好的，这里解释一下我的代码：首先我定义了一个i并赋值为15，表示我要发送15条弹幕；然后我又定义了一个计时器t，用来实现每11秒执行一次；这里计时器的另一个参数是一个函数：
```javascript
function(){
	if (i == 0) { 
		clearInterval(t);
	} 	
	document.getElementsByClassName('cs-textarea')[0].value = '6666' + i; 
	document.getElementsByClassName('b-btn')[0].click(); 
	i--;
}
```
这个函数里又一个判断语句，用来判断函数是否执行了15次，也就是我们需求的发送15条弹幕；然后就是函数主要部分，找到class属性为“cs-textarea”的元素，将它的值修正为“6666+i”（这里的加号是字符串连接符），同理找到“发送按钮”并点击它，所以这里我们便完成了一次发送弹幕的操作，然后通过计时器让它每隔11秒发送一次弹幕，函数里判断是否发送了15次，超过15次的话就clearInterval(t)，也就是结束自己。

接下来，就把刚才写的和之前的代码结合起来，就能完成自动发送弹幕和自动抢鱼丸的功能了！
```javascript
function user_click(){
	document.getElementById("right_col_peck").click();
}
var i=15;
var t=setInterval(function(){
	if (i == 0) { 
		clearInterval(t);
	} 	
	document.getElementsByClassName('cs-textarea')[0].value = '6666' + i; 
	document.getElementsByClassName('b-btn')[0].click(); 
	i--;
}, 11000);
t;
setInterval("user_click()",500);
```

###继续添加功能！
通过之前写的脚本，提高了抢鱼丸的效率，我们能同时在多个房间抢鱼丸了，遇到火箭，进房间，F12，粘贴，回车，然后就等着鱼丸到碗里来。这样有一个问题，因为在多个房间，抢鱼丸的时候没有看着，不知道在这个房间我抢了多少个鱼丸。于是我想了想，决定添加一个按某个按键可以显示你抢了多少鱼丸的功能。

查看了一下斗鱼TV页面的布局，发现直播窗口下面显示了自己的当前鱼丸数量，并且在你抢到了鱼丸后，会自动修正。这样要实现我们的功能就方便多啦！

![fishball](http://img.blog.csdn.net/20161220150121342?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvQ2hhdGlvbl85OQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

我们发现这里877就是我当前的鱼丸数量，它在DOM树里，是一个span元素的子节点，而这个span元素有两个class属性“y1 fl”（同样,测试发现具有这个class的元素只有它一个），这样，通过这句代码，我们就能获得当前鱼丸的数量：
```javascript
document.getElementsByClassName("y1 fl")[0].getElementsByTagName("em")[0].innerHTML;
```
好的，接下来我们在来编写键盘事件，代码如下：
```javascript
document.onkeydown=function(event){
	var keyplay=event||window.event||arguments.callee.caller.arguments[0];
	if(keyplay && keyplay.keyCode == 86){
		//do something...
	}
};
```
这里我选择按"v"来显示当前鱼丸数量（86指键盘v键的asc码），do something，做什么呢？
```javascript
//var ss=document.getElementsByClassName("y1 fl")[0].getElementsByTagName("em")[0].innerHTML;
var ss1=document.getElementsByClassName("y1 fl")[0].getElementsByTagName("em")[0].innerHTML;
var numyw=ss1-ss;alert("哇哦~你在这个房间抢到了 "+numyw+" 个鱼丸呢~!");
```
上面的代码能在一个弹窗里显示你在这个房间里抢到的鱼丸数量！然后我们把之前的代码结合一下，这样最终的代码就完成了，它能自动抢鱼丸，自动发弹幕，还能按键显示你抢到的鱼丸数量~！
```javascript
function user_click(){
	document.getElementById("right_col_peck").click();
}
var i=15;
var t=setInterval(function(){
	if (i == 0) { 
		clearInterval(t);
	} 	
	document.getElementsByClassName('cs-textarea')[0].value = '6666' + i; 
	document.getElementsByClassName('b-btn')[0].click(); 
	i--;
}, 11000);
t;
setInterval("user_click()",500);
var ss=document.getElementsByClassName("y1 fl")[0].getElementsByTagName("em")[0].innerHTML;
document.onkeydown=function(event){
	var keyplay=event||window.event||arguments.callee.caller.arguments[0];
	if(keyplay && keyplay.keyCode==86){
		var ss1=document.getElementsByClassName("y1 fl")[0].getElementsByTagName("em")[0].innerHTML;
		var numyw=ss1-ss;
		alert("哇哦~你在这个房间抢到了 "+numyw+" 个鱼丸呢~!");
	}
};
```
以上的代码是不能在console里运行的，我们必须删除掉空格缩格以及回车等符号：
```javascript
function user_click(){document.getElementById("right_col_peck").click();}var i=15;var t=setInterval(function(){if (i == 0) { clearInterval(t);} document.getElementsByClassName('cs-textarea')[0].value = '6666' + i; document.getElementsByClassName('b-btn')[0].click(); i--;}, 11000);t;setInterval("user_click()",500);var ss=document.getElementsByClassName("y1 fl")[0].getElementsByTagName("em")[0].innerHTML;document.onkeydown=function(event){var keyplay=event||window.event||arguments.callee.caller.arguments[0];if(keyplay && keyplay.keyCode==86){var ss1=document.getElementsByClassName("y1 fl")[0].getElementsByTagName("em")[0].innerHTML;var numyw=ss1-ss;alert("哇哦~你在这个房间抢到了 "+numyw+" 个鱼丸呢~!");}};
```
好了，把上面的代码粘贴到浏览器的控制台里面，去抢鱼丸吧~！

![go](http://img.blog.csdn.net/20161220153922159?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvQ2hhdGlvbl85OQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

2016/12/23 更新：

- 修复了在部分webkit内核浏览器中无法运行的问题
- 优化了代码结构和浏览器内存占用
```javascript
/**
 * 优化了代码结构与内存占用
 */
var box = document.getElementById("right_col_peck");
var textbox = document.getElementsByClassName('cs-textarea')[0];
var submit_text = document.getElementsByClassName('b-btn')[0];
var fish_num = document.getElementsByClassName("y1 fl")[0].querySelectorAll("em")[0];
function user_click(){
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
}, 11000);
t;
setInterval("user_click()",500);
var ss=fish_num.innerHTML;
document.onkeydown=function(event){
	var keyplay=event||window.event||arguments.callee.caller.arguments[0];
	if(keyplay && keyplay.keyCode==86){
		var ss1=fish_num.innerHTML;
		var numyw=ss1-ss;
        alert("哇哦~你在这个房间抢到了 "+numyw+" 个鱼丸呢~!");
	}
};
```
控制台脚本代码：
```javascript
var box = document.getElementById("right_col_peck");var textbox = document.getElementsByClassName('cs-textarea')[0];var submit_text = document.getElementsByClassName('b-btn')[0];var fish_num = document.getElementsByClassName("y1 fl")[0].querySelectorAll("em")[0];function user_click(){box.click();}var i=15;var t=setInterval(function(){if(i==0){clearInterval(t);}textbox.value = '6666' + i;submit_text.click();i--;},11000);t;setInterval("user_click",500);var ss=fish_num.innerHTML;document.onkeydown=function(event){var keyplay=event||window.event||arguments.callee.caller.arguments[0];if(keyplay&&keyplay.keyCode==86){var ss1=fish_num.innerHTML;var numyw=ss1-ss;alert("哇哦~你在这个房间抢到了 "+numyw+" 个鱼丸呢~!");}};
```
脚本代码已上传至GitHub~,欢迎点星~! 
https://github.com/chation/fishball