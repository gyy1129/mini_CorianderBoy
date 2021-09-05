// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  switch (event.action) {
    case 'getUser':
      return getUser(event)
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
    }
  })
  let userList = await db.collection("accountInfo").where({
    openid: event.user.openid
  }).get()
  return userList
}