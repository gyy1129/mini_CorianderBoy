const api = require('../../../utils/api.js')
const app = getApp()

Page({
  data: {},
  goLogout() {
    wx.showModal({
      title: '确定退出吗',
      content: '退出登陆后将看不到王一博的消息了',
      async success(res) {
        if (res.confirm) {
          app.globalData.hasUserInfo = false
          let informationFalse = await api.setColLike()
          wx.setStorageSync('informationFalse', informationFalse.result.data)
          wx.switchTab({
            url: '/pages/personal/index'
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '取消登陆',
            icon: 'none'
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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