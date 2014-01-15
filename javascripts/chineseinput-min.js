!function(a){"use strict";var b="textarea-helper-caret",c="textarea-helper",d=["box-sizing","height","width","padding-bottom","padding-left","padding-right","padding-top","font-family","font-size","font-style","font-variant","font-weight","word-spacing","letter-spacing","line-height","text-decoration","text-indent","text-transform","direction"],e=function(b){"textarea"===b.nodeName.toLowerCase()&&(this.$text=a(b),this.$mirror=a("<div/>").css({position:"absolute",overflow:"auto","white-space":"pre-wrap","word-wrap":"break-word",top:0,left:-9999}).insertAfter(this.$text))};(function(){this.update=function(){for(var c,e={},f=0;c=d[f];f++)e[c]=this.$text.css(c);this.$mirror.css(e).empty();var g=this.getOriginalCaretPos(),h=this.$text.val(),i=document.createTextNode(h.substring(0,g)),j=document.createTextNode(h.substring(g)),k=a("<span/>").addClass(b).css("position","absolute").html("&nbsp;");this.$mirror.append(i,k,j).scrollTop(this.$text.scrollTop())},this.destroy=function(){return this.$mirror.remove(),this.$text.removeData(c),null},this.caretPos=function(){this.update();var a=this.$mirror.find("."+b),c=a.position();return"rtl"===this.$text.css("direction")&&(c.right=this.$mirror.innerWidth()-c.left-a.width(),c.left="auto"),c},this.height=function(){return this.update(),this.$mirror.css("height",""),this.$mirror.height()},this.getOriginalCaretPos=function(){var a=this.$text[0];if(a.selectionStart)return a.selectionStart;if(document.selection){a.focus();var b=document.selection.createRange();if(null==b)return 0;var c=a.createTextRange(),d=c.duplicate();return c.moveToBookmark(b.getBookmark()),d.setEndPoint("EndToStart",c),d.text.length}return 0}}).call(e.prototype),a.fn.textareaHelper=function(b){if(this.each(function(){var b=a(this),d=b.data(c);d||(d=new e(this),b.data(c,d))}),b){var d=this.first().data(c);return d[b]()}return this}}(jQuery),function(a){"use strict";a.chinesePinyinInput=function(b,c){var d=this;d.$el=a(b),d.el=b,c&&"object"==typeof c||(c={}),d.init=function(){d.conf={},d.active=!0,d.pinyinInput="",d.currentPage=0,d.chosenCandidateIndex=1,d.lastPage=!1,d.hanzis=[],d.lens=[],d.wordpinyin="",d.$el.keydown(d.keydownHandler),d.$el.keypress(d.keypressHandler)},d.addTxtAtCusor=function(a){if(document.selection){d.el.focus();var b=document.selection.createRange();b.text=a,d.el.focus()}else if(d.el.selectionStart||"0"==d.el.selectionStart){var c=d.el.selectionStart,e=d.el.selectionEnd,f=d.el.scrollTop;d.el.value=d.el.value.substring(0,c)+a+d.el.value.substring(e,d.el.value.length),d.el.focus(),d.el.selectionStart=c+a.length,d.el.selectionEnd=c+a.length,d.el.scrollTop=f}else d.el.value+=a,d.el.focus()},d.checkPinyinInput=function(){return d.active===!0},d.setPinyinInput=function(a){d.active=a===!0},d.hasPinyinInput=function(){return d.pinyinInput.length>0},d.keydownHandler=function(b){if(!d.checkPinyinInput())return!0;if(d.hasPinyinInput())switch(b.which){case a.ui.keyCode.LEFT:return d.prevCandidate(),!1;case a.ui.keyCode.RIGHT:return d.nextCandidate(),!1;case a.ui.keyCode.PAGE_UP:return d.prevPage(),!1;case a.ui.keyCode.PAGE_DOWN:return d.nextPage(),!1;case a.ui.keyCode.BACKSPACE:return d.pinyinInput=d.pinyinInput.substring(0,d.pinyinInput.length-1),d.refresh(),b.preventDefault(),!1;default:return!0}return!0},d.keypressHandler=function(b){if(d.checkPinyinInput()){var c=String.fromCharCode(b.which),e=/[a-zA-Z]/;if(e.test(c))d.pinyinInput.length<=20&&(d.pinyinInput+=c);else{if(!d.hasPinyinInput())return"."==c?(d.addTxtAtCusor("。"),!1):!0;" "==c?d.chooseCandidate(d.chosenCandidateIndex-1):b.which>=49&&b.which<=53?d.chooseCandidate(b.which-49):b.which==a.ui.keyCode.ENTER&&(d.addTxtAtCusor(d.pinyinInput),d.pinyinInput="",d.currentPage=0,d.chosenCandidateIndex=1,d.lastPage=!1)}return d.refresh(),b.preventDefault(),!1}},d.nextPage=function(){d.lastPage||(d.currentPage+=1),d.refresh()},d.prevPage=function(){d.currentPage=parseInt(Math.max(0,d.currentPage-1)),d.lastPage=!1,d.refresh()},d.nextCandidate=function(){d.chosenCandidateIndex<5?(d.chosenCandidateIndex+=1,d.refresh()):(d.chosenCandidateIndex=1,d.nextPage())},d.prevCandidate=function(){d.chosenCandidateIndex>1?(d.chosenCandidateIndex-=1,d.refresh()):d.currentPage>0&&(d.chosenCandidateIndex=5,d.prevPage())},d.chooseCandidate=function(a){var b=d.hanzis;if(a+=5*d.currentPage,0>a&&(d.addTxtAtCusor(d.pinyinInput),d.pinyinInput="",d.currentPage=0,d.chosenCandidateIndex=1,d.lastPage=!1),b&&a<b.length){var c=b[a],e=d.lens[a];d.addTxtAtCusor(c),d.pinyinInput=e&&e>0&&d.pinyinInput.length>e?d.pinyinInput.substring(e):"",d.currentPage=0,d.chosenCandidateIndex=1,d.lastPage=!1,d.hanzis=[],d.lens=[],d.wordpinyin=""}},d.getPinyinBar=function(){var b=a("#draggableCadidates");return b.size()||(b=a(document.createElement("div")).draggable().attr({id:"draggableCadidates"}).html('<span class="pinyin"></span><ul class="candidates"></ul>'),a("body").append(b)),b},d.refresh=function(){if(!d.hasPinyinInput())return a("#draggableCadidates").hide(),void 0;var b=d.getCandidates();if(b&&b.length){var c=d.getPinyinBar();c.find(".pinyin").text(d.pinyinInput);for(var e=[],f=0;5>f&&f<b.length;f++)e.push("<li "+(f+1==d.chosenCandidateIndex?'class="current"':"")+"> "+(f+1)+". "+b[f]+"</li>");c.find("ul").html(e.join("\n")),c.show();var g=d.$el.textareaHelper("caretPos");c.css({position:"absolute",left:d.$el.offset().left+g.left,top:d.$el.offset().top+g.top})}else d.requestPinyinCandiates(d.pinyinInput,d.currentPage)},d.getCandidates=function(){if(d.pinyinInput.length!==d.wordpinyin.length)return!1;var a=d.hanzis;return a&&a.length>=5*(d.currentPage+1)?a.slice(5*d.currentPage,5*(d.currentPage+1)):a&&a[a.length-1]==d.pinyinInput?(d.lastPage=!0,a.slice(5*d.currentPage)):!1},d.requestPinyinCandiates=function(b,c,e){var f={};e="undefined"==typeof e?10:e,e+=parseInt(Math.floor(c/2))*e,f.text=b,f.num=e,a.get("http://www.google.com/inputtools/request?ime=pinyin&ie=utf-8&oe=utf-8&app=translate&uv",f,function(a){d.parseData(a)})},d.parseData=function(a){"string"==typeof a&&(a=JSON.parse(a));var b=a[1][0];d.wordpinyin=b[0];var c=b[1];if(d.lens=b[2],"undefined"==typeof d.lens){d.lens=new Array(c.length);for(var e=0;e<d.lens.length;e++)d.lens[e]=d.wordpinyin.length}d.hanzis=c,d.refresh()},d.init()},a.fn.chinesePinyinInput=function(b){return this.each(function(){new a.chinesePinyinInput(this,b)})}}(jQuery);
//# sourceMappingURL=build/chineseinput/chineseinput_map.js