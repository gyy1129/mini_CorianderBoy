const api = require('../../utils/api.js')
const db = wx.cloud.database
const openid = wx.getStorageSync('openid')
Page({
  data: {
    id: null,
    list: null,
    imgArr: [],
    length:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const id = options.id
    let detail =  await api.searchId(id)
    let imgList  = await api.searchImg(id)
    this.setData({
      id: id,
      list:detail.result.data[0],
      imgArr:imgList.result.data[0].imgURL,
      length:imgList.result.data.length
    })
  },
  previewImg(e) {
    let that = this
    wx.previewImage({
      current: e.currentTarget.dataset.src, //当前图片地址
      urls: that.data.imgArr, //所有要预览的图片的地址集合 数组形式
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