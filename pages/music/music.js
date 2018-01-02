const app = getApp()
const API = app.globalData.API
const WxParse = app.globalData.WxParse
Page({

  /**
   * 页面的初始数据
   */
  data: {
    music:{},
    tab_name:'story',
    content:'',
    audioStatus:'0',
  },
  //切换内容
  switchContent: function (e) {
    let name = e.currentTarget.dataset.name
    let data = this.data.music[name]
    this.setData({
      tab_name:name,
      content: this.parse('content','html',data)
    })
  },
  //监听音乐播放
  //播放音乐
  playMusic: function () {
    wx.playBackgroundAudio({
      dataUrl: this.data.music.music_id,
      title: this.data.music.title,
    })
    wx.onBackgroundAudioPlay(() => {
      this.setAudioStatus()
    })
  },
  //暂停音乐
  pauseMusic: function () {
    wx.pauseBackgroundAudio()
    wx.onBackgroundAudioPause(()=>{
      this.setAudioStatus()
    })
  },
  //操作音乐
  toggleMusic: function () {
    if(this.data.audioStatus===false){
      this.pauseMusic()
    }else {
      this.playMusic()
    }
  },
  //播放状态
  setAudioStatus: function () {
    this.setData({
      audioStatus: wx.getBackgroundAudioManager().paused
    })
  },
  //解析内容
  parse :function (name,type,data) {
    return WxParse.wxParse(name, type, data, this, 0)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let item_id = options.item_id
    API.getDetailMusic(item_id).then((res)=>{
      this.setData({
        music: res.data.data,
        content: this.parse('content','html',res.data.data.story)
      })
    })
    this.setAudioStatus()
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