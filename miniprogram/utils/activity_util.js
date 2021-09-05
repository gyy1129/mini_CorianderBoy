// 转换时间
const getDate = (year, month) => {
  const newyear = year.substr(0, year.length - 1)
  const setmonth = month.substr(0, month.length - 1)
  const newmonth = setmonth < 10 ? '0' + setmonth : setmonth
  return newyear + '-' + newmonth
}

// 将时间戳转换为时间
const getobjDate = (date)=> {
  let now;
  if (date){
     now = new Date(date)
  }else{
     now = new Date()
  }
    let y = now.getFullYear()
    let m = now.getMonth() + 1
  return y + "-" + (m < 10 ? "0" + m : m)
}

//根据时间2019-01 得到 ['2019','1']
const getarrWithtime = (str) => {
  let arr = str.split('-')
  return arr;
}
module.exports = {
  getDate,
  getobjDate,
  getarrWithtime
}
