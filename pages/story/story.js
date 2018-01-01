const app = getApp()
const API = app.globalData.API
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stories: [],
    current:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      API.getMusic('0').then((res) => {
        this.setData({
          stories: res.data.data,
          current: '0'
        })
      })
  },
  //跳转音乐
  switchMusic: function (e) {
    wx.navigateTo({
      url: `../music/music?item_id=${e.currentTarget.dataset.item_id}`
    })
  },
  //监听滑块
  handleChange: function (e) {
    this.setData({
      current:e.detail.current
    })
    if (this.data.stories){
      if (e.detail.current == this.data.stories.length) {
        let id = this.data.stories[this.data.stories.length - 1].id
        API.getMusic(id).then((res) => {
          let newstories = this.data.stories.concat(res.data.data)
          this.setData({
            stories:newstories
          })
        })
      }
    }
  },
  //写入缓存
  // takeRecord: function (key,data) {
  //   wx.setStorage({
  //     key: key,
  //     data: data,
  //   })
  // },
  //读取缓存
  // getRecord: function (key) {
  //  return wx.getStorageSync(key)
  // },

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