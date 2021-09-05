// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.action) {
    case 'getUser':
      return getUser(event)
    case 'searchLike':
      return searchLike(event)
    case 'searchCollection':
      return searchCollection(event)
    case 'searchId':
      return searchId(event)
    case 'searchImg':
      return searchImg(event)
    case 'searchTime':
      return searchTime(event)
    case 'incLike':
      return incLike(event)
    case 'delLike':
      return delLike(event)
    case 'incCol':
      return incCol(event)
    case 'delCol':
      return delCol(event)
    case 'searchCol':
      return searchCol(event)
    case 'searchFilter':
      return searchFilter(event)
    case 'searchTotal':
      return searchTotal(event)
    case 'search':
      return search(event)
    case 'getAcc':
      return getAcc(event)
    case 'getInfoTotal':
      return getInfoTotal(event)
      case 'getInfo':
        return getInfo(event)
    case 'setColLike':
      return setColLike(event)
    default:
      break
  }
}

// 获取user
async function getUser(event) {
  await db.collection("accountInfo").where({
    openid: event.user.openid
  }).update({
    data: {
      nickName: event.user.nickName,
      avatarUrl: event.user.avatarUrl,
      gender: event.user.gender,
      openid: event.user.openid
    }
  })
  let userList = await db.collection("accountInfo").where({
    openid: event.user.openid
  }).get()
  return userList
}

// 根据collectionType查询info_totalNum
async function searchTotal(event) {
  let result = await db.collection('info_totalNum').where({
    collectionType: event.collectionType
  }).get()
  return result
}

// 根据collectionType查询list
async function searchCollection(event) {
  let result = await db.collection('information').where({
    collectionType: event.collectionType
  }).get()
  return result
}

// 根据filter collectionType查询list
async function searchFilter(event) {
  let result = await db.collection('information').where({
    collectionType: event.collectionType,
    contents: {
      $regex: '.*' + event.filter,
      $options: 'i',
    }
  }).get()
  return result
}
// 根据id查询list
async function searchId(event) {
  let result = await db.collection('information').where({
   
    _id: event.id
  }).get()
  return result
}
// 根据time查询information
async function searchTime(event) {
  let result = await db.collection('information').where({
    collectionType: event.collectionType,
    time: {
      $regex: '.*' + event.time,
      $options: 'i',
    }
  }).get()
  return result
}
// 根据id查询imgList
async function searchImg(event) {
  let result = await db.collection('imgList').where({

    _id: event.id
  }).get()
  return result
}

// 查询collectStatus为true的information
async function searchCol(event) {
  let result = await db.collection('information').where({
    collectStatus: true
  }).get()
  return result
}
// 查询likeStatus为true的information
async function searchLike(event) {
  let result = await db.collection('information').where({
    likeStatus: true
  }).get()
  return result
}

// 取消喜欢
async function delLike(event) {
  await db.collection('information').where({
    _id: event.id,
  }).update({
    data: {
      likeStatus: false
    }
  })
  await db.collection('accountInfo').where({
    openid: event.openid
  }).update({
    data: {
      likeId: _.pop(event.id)
    }
  })
  let result = await db.collection('info_totalNum').doc(event.id).update({
    data: {
      totalLike: _.inc(-1),
      collectionType: event.collectionType
    }
  })
  return result
}
// 添加喜欢
async function incLike(event) {
  await db.collection('information').where({
    _id: event.id
  }).update({
    data: {
      likeStatus: true
    }
  })
  await db.collection('accountInfo').where({
    openid: event.openid
  }).update({
    data: {
      likeId: _.push(event.id)
    }
  })
  let result = await db.collection('info_totalNum').doc(event.id).update({
    data: {
      totalLike: _.inc(1),
      collectionType: event.collectionType
    }
  })
  return result
}

// 取消收藏
async function delCol(event) {
  await db.collection('information').where({
    _id: event.id,
  }).update({
    data: {
      collectStatus: false
    }
  })
  let result = await db.collection('accountInfo').where({
    openid: event.openid
  }).update({
    data: {
      colId: _.pop(event.id)
    }
  })
  return result
}

// 添加收藏
async function incCol(event) {
  await db.collection('information').where({
    _id: event.id
  }).update({
    data: {
      likeStatus: true
    }
  })
  let result = await db.collection('accountInfo').where({
    openid: event.openid
  }).update({
    data: {
      colId: _.push(event.id)
    }
  })
  return result
}
// 获取该用户喜欢收藏id
async function getAcc(event) {
  let userList = await db.collection("accountInfo").where({
    openid: event.user.openid
  }).get()
  if (userList.data.length === 0) {
    await db.collection("accountInfo").add({
      data: event.user
    })
  }
  return userList
}

// 将information中状态设为false
async function setColLike(event) {
  await db.collection('information').where({
    likeStatus: true
  }).update({
    data: {
      likeStatus: false
    }
  })
  await db.collection('information').where({
    collectStatus: true
  }).update({
    data: {
      collectStatus: false
    }
  })
  let information = await db.collection('information').get()
  let total = await db.collection('info_totalNum').get()
  for (let a of total.data) {
    for (let b of information.data) {
      if (a._id == b._id) {
        b.totalLike = a.totalLike
        await db.collection('information').where({
          _id:a._id
        }).update({
          data:{
            totalLike:a.totalLike
          }
        })
        break
      }
    }
  }
  return information
}

// 将information中添加总数
async function getInfoTotal(event) {
  let information = await db.collection('information').get()
  let total = await db.collection('info_totalNum').get()
  for (let a of total.data) {
    for (let b of information.data) {
      if (a._id == b._id) {
        b.totalLike = a.totalLike
        await db.collection('information').where({
          _id:a._id
        }).update({
          data:{
            totalLike:a.totalLike
          }
        })
        break
      }
    }
  }
  return information
}
// 将information中更新状态为true
async function getInfo(event) {
  for (let i of event.likeId) {
    db.collection('information').where({
      _id: i
    }).update({
      data: {
        likeStatus: true
      }
    })
  }
  for (let j of event.colId) {
    await db.collection('information').where({
      _id: j
    }).update({
      data: {
        collectStatus: true
      }
    })
  }
  let information = await db.collection('information').get()
  let total = await db.collection('info_totalNum').get()
  for (let a of total.data) {
    for (let b of information.data) {
      if (a._id == b._id) {
        b.totalLike = a.totalLike
        await db.collection('information').where({
          _id:a._id
        }).update({
          data:{
            totalLike:a.totalLike
          }
        })
        break
      }
    }
  }
  return information
}