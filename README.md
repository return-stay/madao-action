# share1

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



token 3e99c379-a836-45fb-a579-a619b6b4e607
1、首页：/pages/home/home
2、商品详情页：/pages/goods/detail?id=商品id
3、活动页：/pages/active/index?accessUrl=H5链接&paramDic=参数字典json字符串
4、邀请活动：/pages/invite/index?invitationCode=邀请码&accessUrl=H5链接
5、登录：/pages/login/index?invitationCode=邀请码&channel=365活动

ios android
1.跳商品详情的  方法名intentGoodsInfo   参数  商品id给过来    用json串就行
2.跳首页 方法名 intentHome
分享微信  share2Wx 参数 小程序那一堆  title: '', path: '', imageUrl:
朋友圈  share2Pyq   参数大图  imageUrl
