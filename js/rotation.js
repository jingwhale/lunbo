;(function ($, g){

    function Rotation(){
        return this.init.apply(this, arguments);
    }

    Rotation.setting = {
        parent : "#j-lunbo",
        moduleClazz : "u-linboModule",
        selector : "li",
        tpl :'<div>请传入UI</div>>',
        btnBackground:"http://nos.netease.com/edu-image/42A62068F71425B3F4F2C0A75B047EDE.png",
        rotationCount:3,
        btnMargin:5,
        animation:60,
        isArrowHide:false,
        autoplay:false,
        isCycle:false
    };

    pro = Rotation.prototype;

    /**
     * 轮播初始化
     *
     */
    pro.init = function(options){
        if(!options){
            return;
        }
        this.setting = $.extend({},Rotation.setting, options);

        //若开启了自动轮播，将循环开启
        if(!!this.setting.autoplay){
            this.setting.isCycle = true;
            this.setting.isArrowHide = true;
        }
        //关闭切换动画
        if(!this.setting.animation){
            this.setting.animation = 0;
        }

        this.genTpl();
        this.appendToDoc();
        this.getNodes();
        this.appendUI();
        this.bindEvent();

        if(!!this.setting.autoplay){
            this.autoplay();
        }
    };

    /**
     * 轮播结构
     *
     */
    pro.genTpl = function(){
        var _tpl = "",_tempTpl="";

        _tpl = '<div class="u-rotation f-cb">\
                    <div class="u-rotation-btn u-rotation-left j-rotation-arrow f-fl disabled">\
                    </div>\
                    <div class="u-rotation-content j-rotation-content f-fl"></div>\
                    <div class="u-rotation-btn u-rotation-right j-rotation-arrow f-fl">\
                    </div>\
                </div>';

        this.tpl = $(_tpl);

        return _tpl;
    };
    /**
     * 添加轮播结构
     *
     */
    pro.appendToDoc = function(){
        $(this.setting.parent).append(this.tpl);
    };

    /**
     * 获取节点
     *
     */
    pro.getNodes = function(){
        this.parentNode = $(this.setting.parent);
        this.rotationNode = this.parentNode.find(".u-rotation");
        this.arrowNodes = this.parentNode.find(".j-rotation-arrow");
        this.UIContentNode = this.parentNode.find(".j-rotation-content");
        this.index = 0;
    };

    /**
     * 添加轮播区的UI
     *
     */
    pro.appendUI = function(){
        $(this.UIContentNode).append(this.setting.tpl);

        this.listNodes = this.UIContentNode.find(this.setting.selector || "li");

        this.setScroller();
    };


    /**
     * 设置轮播区域
     *
     */
    pro.setScroller = function(){
        var _that = this;

        //设置轮播类
        this.rotationNode.addClass(this.setting.moduleClazz);

        //设置左右按钮距离轮播内容框的距离
        $(this.arrowNodes[0]).css("margin-right" , this.setting.btnMargin);
        $(this.arrowNodes[1]).css("margin-left" , this.setting.btnMargin);

        //设置轮播内容框的高度
        var _commonHeight = this.UIContentNode.find(this.setting.selector || "li").eq(0).outerHeight(true);
        this.rotationNode.css("height",_commonHeight);

        //设置轮播内容框的宽度
        var _totalWidth = 0;
        for(var i= 0,len=this.setting.rotationCount;i<len;i++){
            if(i!=len-1){
                _totalWidth += this.UIContentNode.find(this.setting.selector || "li").eq(i).outerWidth(true);
            }else{
                _totalWidth += this.UIContentNode.find(this.setting.selector || "li").eq(i).outerWidth();
            }
        }
        this.UIContentNode.find("ul").css("width" , Math.ceil(_totalWidth + 1));

        //设置轮播内容一页的最后一个margin为0
        this.UIContentNode.find(this.setting.selector || "li").each(function(_index){
            if((_index+1) % _that.setting.rotationCount ==0){
                $(this).css("margin-right" , 0);
            }
        });

        //设置轮播左右按钮的图片
        $(this.arrowNodes).css("background","url("+this.setting.btnBackground+") center no-repeat");

        //设置轮播左右按钮的隐藏
        if(this.setting.isArrowHide){
            this.arrowNodes.hide();
        }
    };

    /**
     * 绑定事件
     *
     */
    pro.bindEvent = function(){
        var _that = this;

        this.arrowNodes.each(function(_index, _item){
            $(this).click(function(){
                _that.changeItemHandle(!_index);
            });
        });

        if(!!this.setting.autoplay){
            this.UIContentNode.mouseenter(function(){
                !!_that.autoplayTimer && clearTimeout(_that.autoplayTimer);
            }).mouseleave(function(){
                _that.autoplay();
            });
        }
    };

    /**
     * 向左翻页还是向右翻页
     *
     */
    pro.changeItemHandle = function(_left) {
        if(!!_left&&this.index <= 0){
            return;
        }
        if(!this.setting.isCycle){
            if(!_left&&this.index >= this.listNodes.length - this.setting.rotationCount){
                return;
            }
        }

        //隐藏当前数据
        this.dataShowHandle(false);

        //显示当前数据
        if(!this.setting.isCycle){
            this.index = (!!_left ? (this.index - this.setting.rotationCount) : (this.index+this.setting.rotationCount));
        }else{
            var _leftIndex = (!!_left ? (this.index - this.setting.rotationCount) : (this.index+this.setting.rotationCount));
            var _rightIndex = (this.index+this.setting.rotationCount < this.listNodes.length) ? this.index+this.setting.rotationCount : 0;
            this.index = !!_left ? _leftIndex : _rightIndex;
        }
        this.changeNodeHandle();
        this.dataShowHandle(true);
    };

    /**
     * 显示还是隐藏当前数据
     *
     */
    pro.dataShowHandle = function(_showCurrent) {
        var _count = this.setting.rotationCount,
            _len = this.listNodes.length,
            _startIndex = this.index,
            _lastIndex = this.index+_count < _len ? this.index+_count : _len;

        if(!!_showCurrent){
            for (var i=_startIndex; i < _lastIndex;  i++) {
                $(this.listNodes[i]).show(this.setting.animation);
            }
        }else{
            for (var i=_startIndex; i < _lastIndex;  i++) {
                $(this.listNodes[i]).hide(this.setting.animation);
            }
        }
    };

    /**
     * 切换左右btn样式
     *
     */
    pro.changeNodeHandle = function() {
        this.arrowNodes.removeClass("disabled");
        if(this.index <= 0){
            $(this.arrowNodes[0]).addClass("disabled");
        }
        if(!this.setting.isCycle){
            if(this.index >= this.listNodes.length - this.setting.rotationCount || this.listNodes.length <= 0){
                $(this.arrowNodes[1]).addClass("disabled");
            }
        }
    };

    /**
     * 自动轮播
     *
     */
    pro.autoplay = function() {
        var _that = this;
        this.autoplayTimer = setInterval(function(){  //打开定时器
            $(_that.arrowNodes[1]).trigger("click"); //模拟触发数字按钮的click事件
        },_that.setting.autoplay);
    };

    $.createRotation = function(options){
        return new Rotation(options);
    }

})(jQuery , window);    