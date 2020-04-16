/*
maker: http://mins01.com
git: https://github.com/mins01/ui_NodeFilter
made at: 2020-04-14 15:36
modified at:

Copyright 2020 공대여자
The MIT License
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var NodeFilter = (function(){
  var NodeFilter = function(box_selector){
    this.box_selector = box_selector;
  }
  NodeFilter.prototype = {
    "debug":false,
    "box_selector":'',
    "shown_className":'NF-shown',
    "hidden_className":'NF-hidden',
    "item_className":'NF-item',
    "key_pattern":"[data-key*='{{sh}}']",
    "last_selector":"",
    filter:function(key){
      key = key.trim();
      if(key.length>0){
        var ks = key.match(/([^\s]+)/g)
        var shs = [];
        for(var i=0,m=ks.length;i<m;i++){
          shs.push(this.key_pattern.replace(/{{sh}}/g,ks[i].trim().replace(/'/g,"\\\'")));
        }
        var sh0 = shs.join('');
        // var sh1 = ":not("+shs.join('):not(')+")";
        //-- 찾을 selecotor 만들기
        var s0 = this.box_selector+" ."+this.item_className+sh0;
        if(this.last_selector == s0){
          if(this.debug){
            console.log('SKIP','key',key,'selector',this.last_selector);
          }
          return;
        }
        //-- 전부 감추기
        var s1 = this.box_selector+" ."+this.item_className;
        if(this.debug){
          console.log('CLEAR','key',key,'selector',s1);
        }
        var els1 = document.querySelectorAll(s1);
        for(var i=0,m=els1.length;i<m;i++){
          els1[i].classList.replace(this.shown_className,this.hidden_className);
        }
        //-- shown 처리
        this.last_selector = s0
        if(this.debug){
          console.log('SELECTOR','key',key,'selector',this.last_selector);
        }
        var els0 = document.querySelectorAll(this.last_selector);

        for(var i=0,m=els0.length;i<m;i++){
          els0[i].classList.replace(this.hidden_className,this.shown_className);
        }

      }else{
        s0 = this.box_selector+" ."+this.item_className+"."+this.hidden_className;
        if(this.last_selector == s0){
          if(this.debug){
            console.log('SKIP','key',key,'selector',this.last_selector);
          }
          return;
        }
        this.last_selector = s0
        if(this.debug){
          console.log('RESET','key',key,'selector',this.last_selector);
        }
        var els0 = document.querySelectorAll(this.last_selector );
        for(var i=0,m=els0.length;i<m;i++){
          els0[i].classList.remove(this.hidden_className);
          els0[i].classList.add(this.shown_className);
        }
      }

    },
  }
  return NodeFilter;
})()
