const utils = require('../../utils/activity_util')
const moment = require("../../utils/moment")
const api = require('../../utils/api.js')
const app = getApp()

// 初始化日期模态框数据
let date = new Date();
let years = [];
let months = [];
for (let i = 1997; i <= (date.getFullYear() + 5); i++) {
  years.push(i + "年")
}
for (let i = 1; i <= 12; i++) {
  months.push(i + "月")
}
const db = wx.cloud.database()
const _ = db.command
const openid = wx.getStorageSync('openid')

Page({
  data: {
    sidebarheight: null,
    contentheight: null,
    changefalg: false,
    value: [0, 1],
    openflag: true, //1日期控件显示  2控件滚动选择 底部页面不滚动
    years: years, //时间可选范围模态框数据
    months: months,
    year: '', //时间值
    month: '',
    starttime: "",
    isCollapse: false,
    list: [],
    id: "",
    length: 0,
    contents: "",
    imgURL: "",
    time: moment().format('YYYY-MM-DD'),
    likeStatus: false, //喜欢状态
    likeNum: 0, // 喜欢数目
    collectStatus: false, // 收藏状态
    activityStatus: true,
    musicStatus: false,
    bookStatus: false,
    endorsementStatus: false,
    varietyStatus: false,
    searchTimeStatus: false,
    collectionType: "activity",
    defaultSearchValue: "",
    filter: "",
    inputStatus: true,
    totalLike: 0,
    activityList: [],
    musicList: [],
    booksList: [],
    endorsementList: [],
    varietyList: [],
    information: []
  },
  onShow() {
    console.log("onshow")
    let that = this
    if (app.globalData.hasUserInfo) {
      let information = wx.getStorageSync('information')
      that.setData({
        information: information
      })
      console.log(that.information,"infomation")
    } else {
      let information = wx.getStorageSync('informationFalse')
      that.setData({
        information: information
      })
      console.log(that.information,"infomation")
    }
    let activityList = []
    let musicList = []
    let booksList = []
    let endorsementList = []
    let varietyList = []
    for (let i of that.data.information) {
      if (i.collectionType === "activity") {
        activityList.push(i)
      }
      if (i.collectionType === "music") {
        musicList.push(i)
      }
      if (i.collectionType === "books") {
        booksList.push(i)
      }
      if (i.collectionType === "endorsement") {
        endorsementList.push(i)
      }
      if (i.collectionType === "variety") {
        varietyList.push(i)
      }
    }
    that.setData({
      list: activityList,
      activityList,
      musicList,
      booksList,
      endorsementList,
      varietyList
    })
  },

  // 清空搜索内容
  cancelContent() {
    this.setData({
      defaultSearchValue: "",
      inputStatus: true
    })
  },
  // 模糊条件查询
  async bindconfirm(e) {
    const that = this
    const filter = e.detail.value
    const collectionType = e.currentTarget.dataset.coltype
    let res = await api.searchFilter(filter, collectionType)
    that.setData({
      filter: filter,
      collectionType: collectionType,
      list: res.result.data,
      defaultSearchValue: "",
      inputStatus: true
    })
    if (that.data.list.length !== 0) {
      wx.showToast({
        title: '搜索到王一博~',
        icon: 'none'
      })
    }
  },
  // input获取焦点的时候 状态改变
  changeStatus(e) {
    if (e.detail.value === "") {
      this.setData({
        inputStatus: true
      })
    } else {
      this.setData({
        inputStatus: false
      })
    }
  },
  // 取消时间搜索
  async canselTime() {
    let collectionType = this.data.collectionType
    const list = []
    let res = await api.searchCollection(collectionType)
    this.setData({
      starttime: "",
      list: res.result.data
    })
  },
  // 时间搜索
  async onSearchTime() {
    const that = this
    const {
      starttime,
      collectionType
    } = that.data
    that.setData({
      searchTimeStatus: true
    })
    if (starttime === "") {
      wx.showToast({
        title: '选择一个时间呀~',
        icon: 'none'
      })
    } else {
      let searchList = await api.searchTime(starttime, collectionType)
      that.setData({
        list: searchList.result.data,
      })
    }
  },
  // 展开 收齐
  expansion() {
    this.setData({
      isCollapse: !this.data.isCollapse
    })

  },
  // 展示活动页
  async toActivity() {
    this.setData({
      list: this.data.activityList,
      activityStatus: true,
      musicStatus: false,
      bookStatus: false,
      endorsementStatus: false,
      varietyStatus: false
    })
  },
  // 展示音乐页
  async toMusic() {
    this.setData({
      list: this.data.musicList,
      activityStatus: false,
      musicStatus: true,
      bookStatus: false,
      endorsementStatus: false,
      varietyStatus: false
    })
  },
  // 展示杂志页
  async toBook() {
    this.setData({
      list: this.data.booksList,
      activityStatus: false,
      musicStatus: false,
      bookStatus: true,
      endorsementStatus: false,
      varietyStatus: false
    })
  },
  // 展示代言页
  async toEndorsement() {
    this.setData({
      list: this.data.endorsementList,
      activityStatus: false,
      musicStatus: false,
      bookStatus: false,
      endorsementStatus: true,
      varietyStatus: false
    })
  },
  // 展示天天向上页
  async toVariety() {
    this.setData({
      list: this.data.varietyList,
      activityStatus: false,
      musicStatus: false,
      bookStatus: false,
      endorsementStatus: false,
      varietyStatus: true
    })
  },
  // 选择时间
  tap(ev) {
    // 根据选择项目  传去对应数据  根据开始结束时间获取索引  设置面板默认数据
    let value = [2019, 0];
    let arr = [];
    this.data.starttime = utils.getobjDate()
    arr = utils.getarrWithtime(this.data.starttime);
    const {
      years,
      months,
      openflag
    } = this.data;
    //根据arr  数据索引
    value[0] = years.indexOf(arr[0] + '年');
    value[1] = months.indexOf(arr[1] + '月');
    this.setData({
      value,
      openflag: false,
      years, //日期模态框数据
      months
    })

  },
  // 取消
  canslebtn() {
    this.setData({
      openflag: true,
      changefalg: false,
    })
  },
  // 确定  如果不选择那么默认重置
  closebtn() {
    this.setData({
      openflag: true,
    })
    const {
      curindex,
      year,
      month
    } = this.data;
    if (this.data.changefalg) {
      let starttime = utils.getDate(year, month)
      this.setData({
        starttime,
        changefalg: false,
      })
    }
  },
  // 变化时
  bindChange: function (ev) {
    const e = ev;
    let val = e.detail.value;
    const year = this.data.years[val[0]];
    const month = this.data.months[val[1]];
    this.setData({
      year,
      month,
      changefalg: true,
    })
  },
  // 喜欢
  async likeChoose(e) {
    const hasUserInfo = app.globalData.hasUserInfo
    if (!hasUserInfo) {
      wx.showToast({
        title: '先登录呀~',
        icon: 'none'
      })
      return
    }
    const id = e.detail
    const index = id.substr(1)
    let that = this
    let {
      likeStatus,
      totalLike,
      collectionType
    } = that.data.list[index]
    try {
      if (likeStatus === true) {
        let result = await api.delLike(id, collectionType, openid)
        that.setData({
          [`list[${index}].likeStatus`]: false,
          [`list[${index}].totalLike`]: totalLike - 1,
        })
        wx.showToast({
          title: '已取消赞',
          icon: 'success'
        })
      } else {
        let res = await api.incLike(id, collectionType, openid)
        that.setData({
          [`list[${index}].likeStatus`]: true,
          [`list[${index}].totalLike`]: totalLike + 1,
        })
        wx.showToast({
          title: '已赞',
          icon: 'success'
        })
      }
    } catch (err) {
      wx.showToast({
        title: '程序有一点点小异常，操作失败啦',
        icon: 'none'
      })
    }
  },

  // 收藏
  async collectChoose(e) {
    const hasUserInfo = app.globalData.hasUserInfo
    if (!hasUserInfo) {
      wx.showToast({
        title: '先登录呀~',
        icon: 'none'
      })
      return
    }
    const id = e.detail
    const index = id.substr(1)
    let that = this
    let {
      collectStatus,
      collectionType
    } = that.data.list[index]

    try {
      if (collectStatus === true) {
        let result = await api.delCol(id, collectionType, openid)
        that.setData({
          [`list[${index}].collectStatus`]: false
        })
        wx.showToast({
          title: '已取消收藏',
          icon: 'success'
        })
      } else {
        let result = await api.incCol(id, collectionType, openid)
        that.setData({
          [`list[${index}].collectStatus`]: true
        })
        wx.showToast({
          title: '已收藏',
          icon: 'success'
        })
      }
    } catch (err) {
      wx.showToast({
        title: '程序有一点点小异常，操作失败啦',
        icon: 'none'
      })
    }

  },
  // 去详情
  toDetails(e) {
    let id = e.detail
    wx.navigateTo({
      url: '../details/index?id=' + id
    })
  }
})