const api = require('../../utils/api.js')

const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    signature: null,
    user: null,
    information: []
  },
  // 登陆
  goLogin(e) {
    this.getUserProfile()
  },
  //  获取用户信息
  getUserProfile(e) {
    let openid = wx.getStorageSync('openid')
    wx.getUserProfile({
      desc: '获取用户信息',
      success: async res => {
        let that = this
        const user = {
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl,
          gender: res.userInfo.gender,
          openid: openid,
        }
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          user: user
        })
        app.globalData.userInfo = that.data.userInfo
        app.globalData.hasUserInfo = that.data.hasUserInfo
        app.globalData.user = that.data.user
        let acc = await api.getUser(user)
        const likeId = acc.result.data[0].likeId
        const colId = acc.result.data[0].colId
        let information = await api.getInfo(likeId, colId)
        wx.setStorageSync('information', information.result.data)

      }
    })
  },

  // 退出登陆
  async goLogout() {
    await wx.navigateTo({
      url: '/pages/personal/logout/index',
    })
  },

  // 跳转收藏页
  toCollect() {
    if (!this.data.hasUserInfo) {
      wx.showToast({
        title: "请先登录账号",
        icon: 'error',
      })
    } else {
      wx.navigateTo({
        url: '/pages/personal/collection/index'
      })
    }
  },

  // 跳转喜欢页
  toLike() {
    if (!this.data.hasUserInfo) {
      wx.showToast({
        title: "请先登录账号",
        icon: 'error',
      })
    } else {
      wx.navigateTo({
        url: '/pages/personal/favorite/index'
      })
    }
  },
  // 跳转设置签名
  toEdit() {
    if (!this.data.hasUserInfo) {
      wx.showToast({
        title: "请先登录账号",
        icon: 'error',
      })
    } else {
      wx.navigateTo({
        url: '/pages/personal/edit/index'
      })
    }
  },
  // 跳转联系作者
  toMe() {
    wx.navigateTo({
      url: '/pages/personal/contact/index'
    })
  },

  // 跳转关于
  toAbout() {
    wx.navigateTo({
      url: '/pages/personal/about/index'
    })
  },

  async onLoad(options) {
    const openid = wx.getStorageSync('openid')
    const user = {
      openid: openid,
      colId: [],
      likeId: []
    }
    let acc = await api.getAcc(user)
    let informationFalse = await api.setColLike()
    wx.setStorageSync('informationFalse', informationFalse.result.data)
  },
  async onHide() {
    if (!this.data.hasUserInfo) {
      let res = await api.setColLike()
      wx.setStorageSync('informationFalse', res.result.data)
    }
  },
  onShow() {
    const signature = wx.getStorageSync('signature')
    let hasUserInfo = app.globalData.hasUserInfo
    this.setData({
      signature: signature,
      hasUserInfo: hasUserInfo
    })
  }
})