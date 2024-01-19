const shareMethod = {
  // 分享到微信好友功能
  onShareAppMessage() {
    return {
      title: '灵工小程序',
      path: '/pages/login/index',
      imageUrl: '' //自定义图片路径，支持PNG及JPG，显示图片长宽比是 5:4
    };
  }
};

export default shareMethod;
