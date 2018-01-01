const root = 'http://v3.wufazhuce.com:8000/api'
const wxRequest = (url, data, method) => {
  return new Promise(function (resolve, reject) {
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    wx.request({
      url: url,
      method: method || 'GET',
      data: data || {},
      header: {
        'Content-Type': 'application/json'
      },
      success: (res) => {
        wx.hideLoading()
        resolve(res)
      },
      fail: (res) => {
        wx.hideLoading()
        reject(res)
      },
    })
  })
  
}


const getIdList = () => wxRequest(root + '/onelist/idlist')
const getFirstPage = (id) => wxRequest(root + '/onelist/'+id+'/0')
const getMusic = (id) => wxRequest(root + '/channel/music/more/'+id)
const getDetailMusic = (id) => wxRequest(root + '/music/detail/' + id)

module.exports = {
  getIdList,
  getFirstPage,
  getMusic,
  getDetailMusic
}
