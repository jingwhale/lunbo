/* 分享 */
(function (jq, g) {
    // 初始化侧边栏
    jq.initSlider({
        notshow : false,
        gzUrl : '${"name":"gzurl", "description":"官方关注链接，可以不填"}' // 关注链接
    });

    // 初始化页面分享，description已经去掉
    window.shareObj = jq.initPageShare({
        title: '${"name":"sharetitle", "description":"微博分享文案"}', // 只用于微博
        pic: '${"name":"sharepic", "description":"微博分享图片地址"}', // 只用于微博
        mTitle : '${"name":"msharetitle", "description":"QQ、微信、易信分享标题"}', // 微信、易信分享标题
        mDescription : '${"name":"msharedescription", "description":"QQ、微信、易信分享描述"}', // 微信、易信分享的文案：主要用于人人网 开心网
        mPic  : '${"name":"msharepic", "description":"QQ、微信、易信分享图片地址"}', // 微信、易信分享的图片
        url: '${"name":"shareUrl", "description":"分享出去的链接"}', // 微信、易信分享的图片, // 分享的链接，为空则取当前页面地址
        weixinQR: '${"name":"weixinqrpicurl", "description":"微信易信分享二维码图片地址"}', // 微信分享二维码
        from: '' // ga事件里面需要区分，暂时没有该功能
    });

})(jQuery, window);
