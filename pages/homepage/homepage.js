// pages/homepage/homepage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    indicatoColor: 'white',
    indicatorActiveColor: '#db4b29',
    banners: [],
    categories: [
      {
        name: '抢购新茶',
        src: '../../images/homepage/home_newtea.png'
      },
      {
        name: '逛逛商城',
        src: '../../images/homepage/home_market.png'
      },
      {
        name: '我要取茶',
        src: '../../images/homepage/home_gettea.png'
      },
      {
        name: '品牌溯源',
        src: '../../images/homepage/home_brand.png'
      },
    ],
    notices: [],
    newteaList: [],
    newsList: []
  },

  getBannerInfo: function() {
    var that = this
    wx.request({
      url: 'https://www.teaexs.com/app/advertise/image/query.do',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        pageCode: 'APP_index',
        pageZoneCode: 'carouse_figure'
      },
      success: function (res) {
        if (res.data.head.code == 0) {
          that.setData({
            banners: res.data.body
          })
          if (that.data.banners.length == 1) {
            that.setData({
                indicatorDots: false
            })
          }
        } else {

        }
      },
      complete: function() {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }
    })
  },

  getHomeNotice: function() {
    var that = this
    wx.request({
      url: 'https://www.teaexs.com/app/notice/manager/queryPublishedNotice.do',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        page: 1,
        pageSize: 5
      },
      success: function (res) {
        if (res.data.head.code == 0) {
          that.setData({
            notices: res.data.body.rows
          })
        } else {

        }
      },
      complete: function () {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }
    })
  },

  getNewTeaList: function () {
    var that = this
    wx.request({
      url: 'https://www.teaexs.com/app/show/productIssue/queryProductIssueList.do',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        
      },
      success: function (res) {
        if (res.data.head.code == 0) {
          that.setData({
            newteaList: res.data.body.priorList.concat(res.data.body.waitList).concat(res.data.body.startList)
              .concat(res.data.body.timingList).concat(res.data.body.endList)
          })
        } else {

        }
      },
      complete: function () {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }
    })
  },

  getHomeNews: function () {
    var that = this
    wx.request({
      url: 'https://www.teaexs.com/app/notice/news/queryPage.do',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        page: 1,
        pageSize: 5
      },
      success: function (res) {
        if (res.data.head.code == 0) {
          that.setData({
            newsList: res.data.body.rows
          })
        } else {

        }
      },
      complete: function () {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBannerInfo()
    this.getHomeNotice()
    this.getNewTeaList()
    this.getHomeNews()
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
    wx.showNavigationBarLoading()
    this.getBannerInfo()
    this.getHomeNotice()
    this.getNewTeaList()
    this.getHomeNews()
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