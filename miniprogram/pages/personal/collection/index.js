const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalCollection: 0,
    collectStatus:true,
    list:[]
  },
  toDetail(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../details/index?id=' + id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let that = this
    let res = await api.searchCol()
    let totalCollection = res.result.data.length
    that.setData({
      list:res.result.data,
      totalCollection:totalCollection
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