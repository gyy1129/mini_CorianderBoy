// 查询
function search(collectionType) {
  return wx.cloud.callFunction({
    name: "listService",
    data: {
      action: "search",
      collectionType: collectionType
    }
  })
}
// 根据collectionType查询info_totalNum
function searchTotal(collectionType) {
  return wx.cloud.callFunction({
    name: "listService",
    data: {
      action: "searchTotal",
      collectionType: collectionType
    }
  })
}
// 根据filter collectionType查询list
function searchFilter(filter, collectionType) {
  return wx.cloud.callFunction({
    name: "listService",
    data: {
      action: "searchFilter",
      filter: filter,
      collectionType: collectionType
    }
  })
}

// 根据collectionType查询list
function searchCollection(collectionType) {
  return wx.cloud.callFunction({
    name: "listService",
    data: {
      action: "searchCollection",
      collectionType: collectionType
    }
  })
}
// 根据id查询list
function searchId(id) {
  return wx.cloud.callFunction({
    name: "listService",
    data: {
      action: "searchId",
      id: id
    }
  })
}
// 根据id查询imgList
function searchImg(id) {
  return wx.cloud.callFunction({
    name: "listService",
    data: {
      action: "searchImg",
      id: id
    }
  })
}
// 根据time查询information
function searchTime(time, collectionType) {
  return wx.cloud.callFunction({
    name: "listService",
    data: {
      action: "searchTime",
      time: time,
      collectionType: collectionType
    }
  })
}
// 根据collectStatus查询information
function searchCol() {
  return wx.cloud.callFunction({
    name: "listService",
    data: {
      action: "searchCol",
    }
  })
}

// 根据likeStatus查询information
function searchLike() {
  return wx.cloud.callFunction({
    name: "listService",
    data: {
      action: "searchLike",
    }
  })
}

// 取消喜欢
function delLike(id, collectionType, openid) {
  return wx.cloud.callFunction({
    name: "listService",
    data: {
      action: "delLike",
      id: id,
      collectionType: collectionType,
      openid: openid
    }
  })
}
// 添加喜欢
function incLike(id, collectionType, openid) {
  return wx.cloud.callFunction({
    name: "listService",
    data: {
      action: "incLike",
      id: id,
      collectionType: collectionType,
      openid: openid
    }
  })
}

// 添加收藏
function incCol(id, collectionType, openid) {
  return wx.cloud.callFunction({
    name: "listService",
    data: {
      action: "incCol",
      id: id,
      collectionType: collectionType,
      openid: openid
    }
  })
}

// 删除收藏
function delCol(id, collectionType, openid) {
  return wx.cloud.callFunction({
    name: "listService",
    data: {
      action: "delCol",
      id: id,
      collectionType: collectionType,
      openid: openid
    }
  })
}

// 获取user
function getUser(user) {
  return wx.cloud.callFunction({
    name: "listService",
    data: {
      action: "getUser",
      user: user
    }
  })
}

// 获取该用户喜欢收藏id 利用openid
function getAcc(user) {
  return wx.cloud.callFunction({
    name: "listService",
    data: {
      action: "getAcc",
      user: user
    }
  })
}

// 将information中的collectStatus置为false
function setColLike(likeId, colId) {
  return wx.cloud.callFunction({
    name: "listService",
    data: {
      action: "setColLike",
    }
  })
}

// 将information中添加总数
function getInfoTotal() {
  return wx.cloud.callFunction({
    name: "listService",
    data: {
      action: "getInfoTotal",
    }
  })
}
// 将information中更新状态
function getInfo(likeId, colId) {
  return wx.cloud.callFunction({
    name: "listService",
    data: {
      action: "getInfo",
      likeId: likeId,
      colId: colId
    }
  })
}

module.exports = {
  searchFilter,
  searchCollection,
  searchId,
  searchImg,
  searchTime,
  searchLike,
  searchCol,
  searchTotal,

  getUser,
  search,
  incLike,
  delLike,
  incCol,
  delCol,
  getAcc,
  setColLike,
  getInfoTotal,
  getInfo
}