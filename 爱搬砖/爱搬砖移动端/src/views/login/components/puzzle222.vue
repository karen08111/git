<template>
  <div class="puzzle">
    <div class="tncode_div_bg" id="tncode_div_bg"></div>
    <div class="tncode_div" id="tncode_div">
      <div class="loading">加载中</div>
      <canvas class="tncode_canvas_bg"></canvas>
      <canvas class="tncode_canvas_mark"></canvas>
      <div class="hgroup" v-show="hgshow"></div>
      <div class="tncode_msg_error"></div>
      <div class="tncode_msg_ok"></div>
      <div class="slide">
        <div class="slide_block"
             @mousedown.prevent="_block_start_move"
             @mousemove.prevent="_block_on_move"
             @mouseup.prevent="_block_on_end"
             @touchstart.prevent="_block_start_move"
             @touchmove.prevent="_block_on_move"
             @touchend.prevent="_block_on_end"></div>
        <div class="slide_block_text">拖动左边滑块完成上方拼图</div>
      </div>
      <div class="tools">
        <div class="tncode_close" @click.prevent="close"></div>
        <div class="tncode_refresh" @click.prevent="refresh"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {baseURL} from '@/axios'

  document.getElementByClassName = function (className, index) {
    var nodes = document.getElementsByTagName("*");//获取页面里所有元素，因为他会匹配全页面元素，所以性能上有缺陷，但是可以约束他的搜索范围；
    var arr = [];//用来保存符合的className；
    for (var i = 0; i < nodes.length; i++) {
      if (hasClass(nodes[i], className)) arr.push(nodes[i]);
    }
    if (!index) index = 0;
    return index == -1 ? arr : arr[index];
  };

  function hasClass(elem, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
    var ret = new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
    return ret;
  }

  function addClass(elements, cName) {
    if (!hasClass(elements, cName)) {
      elements.className += " " + cName;
    }
    ;
  }

  function removeClass(elements, cName) {
    if (hasClass(elements, cName)) {
      elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " "); // replace方法是替换
    }
    ;
  }

  function appendHTML(o, html) {
    var divTemp = document.createElement("div"), nodes = null
      , fragment = document.createDocumentFragment();
    divTemp.innerHTML = html;
    nodes = divTemp.childNodes;
    for (var i = 0, length = nodes.length; i < length; i += 1) {
      fragment.appendChild(nodes[i].cloneNode(true));
    }
    o.appendChild(fragment);
    nodes = null;
    fragment = null;
  };

  export default {
    name: "puzzle",
    data() {
      return {
        _obj: null,
        _tncode: null,
        _img: null,
        appID: null,
        _img_loaded: false,
        _is_draw_bg: false,
        _is_moving: false,
        _block_start_x: 0,
        _block_start_y: 0,
        _doing: false,
        _mark_w: 50,
        _mark_h: 50,
        _mark_offset: 0,
        _img_w: 240,
        _img_h: 150,
        _result: false,
        _err_c: 0,
        _onsuccess: null,
        hgshow: false,
      }
    },
    methods: {
      refresh (){
        this._err_c = 0;
        this._is_draw_bg = false;
        this._result = false;
        this._img_loaded = false;
        var obj = document.getElementByClassName('tncode_canvas_bg');
        obj.style.display = "none";
        obj = document.getElementByClassName('tncode_canvas_mark');
        obj.style.display = "none";
        var obj = document.getElementByClassName('tncode_canvas_bg');
        var isSupportWebp = !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
        this._img = new Image();
        this.$http.get(`${baseURL}/member/moveImages?t=${Math.random()}`).then(res => {


          // this._img.src = img_url;
          this._img.onload = () => {
            this._draw_fullbg()
            var canvas_mark = document.getElementByClassName('tncode_canvas_mark');
            var ctx_mark = canvas_mark.getContext('2d');
            //清理画布
            ctx_mark.clearRect(0, 0, canvas_mark.width, canvas_mark.height);
            this._img_loaded = true;
            obj = document.getElementByClassName('tncode_canvas_bg');
            obj.style.display = "";
            obj = document.getElementByClassName('tncode_canvas_mark');
            obj.style.display = "";
          }

          this._img.crossOrigin = '';
          this._img.src = res
          if (!isSupportWebp) {//浏览器不支持webp
            this._img.src += "&nowebp=1";
          }
          //alert("Hong Kong ForHarvest Technology and Culture Development Co. Limited".length);
          obj = document.getElementByClassName('slide_block');
          obj.style.cssText = "transform: translate(0px, 0px)";
          obj = document.getElementByClassName('slide_block_text');
          obj.style.display = "block";
        })
      },
      request (url, callback, postVars){
        this.$http.get(url,{headers: {'Abz-Request-Id': this.$cookies.get('abzappid')}}).then(res => {
          callback.success(res)
        })
      },
      _draw_fullbg (){
        var canvas_bg = document.getElementByClassName('tncode_canvas_bg');
        var ctx_bg = canvas_bg.getContext('2d');

        ctx_bg.drawImage(this._img, 0, this._img_h * 2, this._img_w, this._img_h, 0, 0, this._img_w, this._img_h);
      },
      _draw_bg (){
        if (this._is_draw_bg) {
          return;
        }
        this._is_draw_bg = true;
        var canvas_bg = document.getElementByClassName('tncode_canvas_bg');
        var ctx_bg = canvas_bg.getContext('2d');
        ctx_bg.drawImage(this._img, 0, 0, this._img_w, this._img_h, 0, 0, this._img_w, this._img_h);
      },
      _draw_mark (){
        var canvas_mark = document.getElementByClassName('tncode_canvas_mark');
        var ctx_mark = canvas_mark.getContext('2d');
        //清理画布
        ctx_mark.clearRect(0, 0, canvas_mark.width, canvas_mark.height);
        ctx_mark.drawImage(this._img, 0, this._img_h, this._mark_w, this._img_h, this._mark_offset, 0, this._mark_w, this._img_h);
        var imageData = ctx_mark.getImageData(0, 0, this._img_w, this._img_h);
        // 获取画布的像素信息
        // 是一个一维数组，包含以 RGBA 顺序的数据，数据使用  0 至 255（包含）的整数表示
        // 如：图片由两个像素构成，一个像素是白色，一个像素是黑色，那么 data 为
        // [255,255,255,255,0,0,0,255]
        // 这个一维数组可以看成是两个像素中RBGA通道的数组的集合即:
        // [R,G,B,A].concat([R,G,B,A])
        var data = imageData.data;
        //alert(data.length/4);
        var x = this._img_h, y = this._img_w;
        for (var j = 0; j < x; j++) {
          var ii = 1, k1 = -1;
          for (var k = 0; k < y && k >= 0 && k > k1;) {
            // 得到 RGBA 通道的值
            var i = (j * y + k) * 4;
            k += ii;
            var r = data[i]
              , g = data[i + 1]
              , b = data[i + 2];
            // 我们从最下面那张颜色生成器中可以看到在图片的右上角区域，有一小块在
            // 肉眼的观察下基本都是白色的，所以我在这里把 RGB 值都在 245 以上的
            // 的定义为白色
            // 大家也可以自己定义的更精确，或者更宽泛一些
            if (r + g + b < 200) data[i + 3] = 0;
            else {
              var arr_pix = [1, -5];
              var arr_op = [250, 0];
              for (var i = 1; i < arr_pix[0] - arr_pix[1]; i++) {
                var iiii = arr_pix[0] - 1 * i;
                var op = parseInt(arr_op[0] - (arr_op[0] - arr_op[1]) / (arr_pix[0] - arr_pix[1]) * i);
                var iii = (j * y + k + iiii * ii) * 4;
                data[iii + 3] = op;
              }
              if (ii == -1) {
                break;
              }
              k1 = k;
              k = y - 1;
              ii = -1;
            }
            ;
          }
        }
        ctx_mark.putImageData(imageData, 0, 0);
      },
      _reset (){
        this._mark_offset = 0;
        this._draw_bg();
        this._draw_mark();
        var obj = document.getElementByClassName('slide_block');
        obj.style.cssText = "transform: translate(0px, 0px)";
      },
      show (){
        var obj = document.getElementByClassName('hgroup');
        if (obj) {
          this.hgshow = false
        }
        this.refresh()
      },
      hide (){
        document.getElementsByClassName('tncode')[0].style.display = 'none'
        document.getElementById('tncode_div_bg').style.display = "none";
        document.getElementById('tncode_div').style.display = "none";
      },
      _showmsg (msg, status){
        if (!status) {
          status = 0;
          var obj = document.getElementByClassName('tncode_msg_error');
        } else {
          var obj = document.getElementByClassName('tncode_msg_ok');
        }
        obj.innerHTML = msg;
        var setOpacity = function (ele, opacity) {
          if (ele.style.opacity != undefined) {
            ///兼容FF和GG和新版本IE
            ele.style.opacity = opacity / 100;

          } else {
            ///兼容老版本ie
            ele.style.filter = "alpha(opacity=" + opacity + ")";
          }
        };

        function fadeout(ele, opacity, speed) {
          if (ele) {
            var v = ele.style.filter.replace("alpha(opacity=", "").replace(")", "") || ele.style.opacity || 100;
            v < 1 && (v = v * 100);
            var count = speed / 1000;
            var avg = (100 - opacity) / count;
            var timer = null;
            timer = setInterval(function () {
              if (v - avg > opacity) {
                v -= avg;
                setOpacity(ele, v);
              } else {
                setOpacity(ele, 0);
                if (status == 0) {
                  this._reset();
                }
                clearInterval(timer);
              }
            }, 100);
          }
        }

        function fadein(ele, opacity, speed) {
          if (ele) {
            var v = ele.style.filter.replace("alpha(opacity=", "").replace(")", "") || ele.style.opacity;
            v < 1 && (v = v * 100);
            var count = speed / 1000;
            var avg = count < 2 ? (opacity / count) : (opacity / count - 1);
            var timer = null;
            timer = setInterval(function () {
              if (v < opacity) {
                v += avg;
                setOpacity(ele, v);
              } else {
                clearInterval(timer);
                setTimeout(function () {
                  fadeout(obj, 0, 6000);
                }, 1000);
              }
            }, 100);
          }
        }

        fadein(obj, 80, 4000);
      },
      _block_start_move (){
        if (this._doing || !this._img_loaded) {
          return;
        }
        var theEvent = window.event || e;
        if (theEvent.touches) {
          theEvent = theEvent.touches[0];
        }

        var obj = document.getElementByClassName('slide_block_text');
        obj.style.display = "none";
        this._draw_bg();
        this._block_start_x = theEvent.clientX;
        this._block_start_y = theEvent.clientY;
        this._doing = true;
        this._is_moving = true;
      },
      _block_on_move (){
        if (!this._doing) return true;
        if (!this._is_moving) return true;
        var theEvent = window.event || e;
        if (theEvent.touches) {
          theEvent = theEvent.touches[0];
        }
        this._is_moving = true;
        //document.getElementById('msg').innerHTML = "move:"+theEvent.clientX+";"+theEvent.clientY;
        var offset = theEvent.clientX - this._block_start_x;
        if (offset < 0) {
          offset = 0;
        }
        var max_off = this._img_w - this._mark_w;
        if (offset > max_off) {
          offset = max_off;
        }
        var obj = document.getElementByClassName('slide_block');

        obj.style.cssText = "transform: translate(" + offset + "px, 0px)";
        this._mark_offset = offset / max_off * (this._img_w - this._mark_w);
        this._draw_bg();
        this._draw_mark();
      },
      _block_on_end (){
        if (!this._doing) return true;
        var theEvent = window.event || e;
        if (theEvent.touches) {
          theEvent = theEvent.touches[0];
        }
        this._is_moving = false;
        this._send_result();
      },
      _reset (){
        this._mark_offset = 0;
        this._draw_bg();
        this._draw_mark();
        var obj = document.getElementByClassName('slide_block');
        obj.style.cssText = "transform: translate(0px, 0px)";
      },
      _send_result_success (responseText, responseXML){
        this._doing = false;
        if(responseText.code == 200){
          this._tncode.innerHTML = '√验证成功';
          this._showmsg('√验证成功', 1);
          this._result = true;
          document.getElementByClassName('hgroup').style.display = "block";
          setTimeout(this.hide, 0);
          setTimeout(() => document.getElementById('hide').innerText = 1, 0)
          if (this._onsuccess) {
            this._onsuccess();
          }
          document.getElementById('tncode_div').style.display = 'none'
          document.getElementsByClassName('tncode')[0].style.display = 'none'
        }else{
          var obj = document.getElementById('tncode_div');
          addClass(obj, 'dd');
          setTimeout(function () {
            removeClass(obj, 'dd');
          }, 200);
          this._result = false;
          this._showmsg(res.msg);
          this._err_c++;
          this.refresh();
        }
      },
      _send_result (){
        var haddle = {success: this._send_result_success};
        console.log(haddle)
        this._result = false;
        this.request(baseURL + '/member/moveImagesCheck?tn_r=' + this._mark_offset, haddle)
      },
      close (){
        this.$emit('close')
      }
    },
    mounted (){
      this.$nextTick(function (){
        this.show()
      })
    }
  }
</script>

<style scoped lang="less">
  .puzzle{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  /*按钮*/
  .clear {
    clear: both;
  }

  .tncode {
    border: 1PX solid #ccc;
    border-radius: 2rem;
    width: 5.2rem;
    height: 0.88rem;
    background-color: #fff;
    text-align: center;
    cursor: pointer;
    opacity: 1;
    line-height: 0.88rem;
    z-index: 9999;
    position: absolute;
    top: 6.9rem;
    left: 0;
    right: 0;
    margin: auto;
  }

  /*浮层*/
  .tncode_div_bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0.3;
    filter: alpha(opacity=30);
    background-color: #000;
    *zoom: 1;
  }

  .tncode_div {
    background-color: white;
    z-index: 1000000;
    width: 5.2rem;
    height: 5.2rem;
    position: absolute;
    left: 0;
    right: 0;
    top: 4rem;
    margin: auto;
    border: 1PX solid #d1d1d1;
    border-radius: 0.02rem;
    overflow: hidden;
    filter: progid:DXImageTransform.Microsoft.Shadow(color='#969696', Direction=135, Strength=5); /*for ie6,7,8*/
    /*background-color: #ccc;*/
    -moz-box-shadow: 0.02rem 0.02rem 0.05rem #969696; /*firefox*/
    -webkit-box-shadow: 0.02rem 0.02rem 0.05rem #969696; /*webkit*/
    box-shadow: 0.02rem 0.02rem 0.05rem #969696; /*opera或ie9*/
  }

  .tncode_div .tncode_canvas_bg {
    z-index: 0;
  }

  .tncode_div .tncode_canvas_mark {
    z-index: 10000;
  }

  .tncode_div canvas {
    position: absolute;
    left: 0.10rem;
    top: 0.10rem;
  }

  .tncode_div .loading {
    padding-top: 0.60rem;
    position: absolute;
    left: 0.10rem;
    top: 0.10rem;
    background-color: #ccc;
    width: 4.8rem;
    height: 3rem;
    text-align: center;
    box-sizing: border-box;
  }

  .dd {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-animation: ddf 0.1s ease-in 0s infinite;
    -o-animation: ddf 0.1s ease-in 0s infinite;
    animation: ddf 0.1s ease-in 0s infinite;
  }

  @-webkit-keyframes ddf {
    0% {
      -webkit-transform: translate(-0.08rem, 0.03rem);
    }
    20% {
      -webkit-transform: translate(-0.03rem, 0.015rem);
    }
    50% {
      -webkit-transform: translate(0rem, 0rem);
    }
    70% {
      -webkit-transform: translate(0.05rem, -0.015rem);
    }
    100% {
      -webkit-transform: translate(0rem, 0rem);
    }
  }

  @-o-keyframes ddf {
    0% {
      -o-transform: translate(-0.08rem, 0.03rem);
    }
    20% {
      -o-transform: translate(-0.03rem, 0.015rem);
    }
    50% {
      -o-transform: translate(0rem, 0rem);
    }
    70% {
      -o-transform: translate(0.05rem, -0.015rem);
    }
    100% {
      -o-transform: translate(0rem, 0rem);
    }
  }

  @-moz-keyframes ddf {
    0% {
      -moz-transform: translate(-0.08rem, 0.03rem);
    }
    20% {
      -moz-transform: translate(-0.03rem, 0.015rem);
    }
    50% {
      -moz-transform: translate(0rem, 0rem);
    }
    70% {
      -moz-transform: translate(0.05rem, -0.015rem);
    }
    100% {
      -moz-transform: translate(0rem, 0rem);
    }
  }

  @keyframes ddf {
    0% {
      transform: translate(-0.08rem, 0.03rem);
    }
    20% {
      transform: translate(-0.03rem, 0.015rem);
    }
    50% {
      transform: translate(0rem, 0rem);
    }
    70% {
      transform: translate(0.05rem, -0.015rem);
    }
    100% {
      transform: translate(0rem, 0rem);
    }
  }

  .hgroup {
    z-index: 20000;
    content: "";
    position: absolute;
    left: -8rem;
    top: 7rem;
    width: 7rem;
    height: 0.3rem;
    background-color: rgba(255, 255, 255, .5);
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-animation: searchLights 1.5s ease-in 0s infinite;
    -o-animation: searchLights 1.5s ease-in 0s infinite;
    animation: searchLights 1.5s ease-in 0s infinite;
  }

  @-webkit-keyframes searchLights {
    0% {
      left: -8.00rem;
      top: 0.70rem;
    }

    to {
      left: 3.50rem;
      top: 0.70rem
    }
  }

  @-o-keyframes searchLights {
    0% {
      left: -8.00rem;
      top: 0.70rem;
    }

    to {
      left: 3.50rem;
      top: 0.70rem
    }
  }

  @-moz-keyframes searchLights {
    0% {
      left: -8.00rem;
      top: 0.70rem;
    }

    to {
      left: 3.50rem;
      top: 0.70rem
    }
  }

  @keyframes searchLights {
    0% {
      left: -8.00rem;
      top: 0.70rem;
    }

    to {
      left: 3.50rem;
      top: 0.70rem
    }
  }

  /*拉条*/
  .slide, .slide_block, .tools .tncode_close, .tools .tncode_refresh {
    background-repeat: no-repeat;
    background-image: url('img/icon.png');
    background-size: 4.3rem;
  }

  .tncode_msg_ok {
    background-color: #24C628;
  }

  .tncode_msg_error {
    background-color: #DE5145;
  }

  .tncode_msg_ok, .tncode_msg_error {
    position: absolute;
    top: 2.72rem;
    left: 0.20rem;
    width: 4.4rem;
    height: 0.40rem;
    color: #fff;
    margin: 0;
    padding: 0.04rem 0.20rem;
    overflow: visible;
    background-position: 0rem 0rem;
    font-size: 0.28rem;
    opacity: 0;
    filter: alpha(opacity=0);
    z-index: 10000;
  }

  .slide {
    position: absolute;
    top: 3.2rem;
    width: 93.52%;
    height: 0rem;
    background-color: white;
    background-size: 100%;
    margin: 5.39% 3.24%;
    padding: 0rem 0rem 13.67%;
    overflow: visible;
    background-position: 0rem 0rem;
  }

  .tools {
    position: absolute;
    top: 4.2rem;
    width: 93.52%;
    height: 0rem;
    background-color: white;
    background-size: 100%;
    margin: 5.39% 3.24%;
    padding: 0.1rem 0rem 13.67%;
    overflow: visible;
    background-position: 0rem 0rem;
    border-top: 1PX solid #EEEEEE;
  }

  .slide_block {
    background-position: -0.03rem 12.9794%;
    width: 1rem;
    height: 1rem;
    position: absolute;
    left: 0rem;
    top: 0.1rem;
    margin: -4.62% 0 0 -2.31%;
    cursor: pointer;
  }

  .slide_block_text {
    background-position: 0rem 12.9794%;
    height: 1.3rem;
    position: absolute;
    left: 1rem;
    top: 0.44rem;
    margin: -4.62% 0 0 -2.31%;
    cursor: pointer;
    font-size: 0.28rem;
    color: rgb(136, 148, 157);
  }

  .tncode_canvas_bg, .tncode_canvas_mark {
    /* width: 240rem;*/
  }

  .tools .tncode_close {
    background-position: 0 49%;
    background-size: 4.3rem;
    height: 0.60rem;
    width: 0.60rem;
    float: left;
    margin-right: 0.20rem;
    cursor: pointer;
  }

  .tools .tncode_refresh {
    background-position: 0 94%;
    background-size: 4.3rem;
    height: 0.60rem;
    width: 0.60rem;
    float: left;
    cursor: pointer;
  }

  .tools .tncode_tips {
    float: right;
  }

  .tools .tncode_tips a {
    text-decoration: none;
    font-size: 0.20rem;
    color: rgb(136, 148, 157);
  }

</style>