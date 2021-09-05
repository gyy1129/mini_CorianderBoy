Page({
  data: {
    signature: null,
    isDisabled: true
  },
  edit(e) {
    if (e.detail.value !== this.data.signature) {
      this.setData({
        isDisabled: false
      })
    }
  },
  // 保存
  save(e) {
    const textarea = e.detail.value.textarea
    this.setData({
      signature: textarea,
      isDisabled: true
    })
    wx.setStorageSync('signature', textarea)
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const signature = wx.getStorageSync('signature');
    this.setData({
      signature: signature,

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})