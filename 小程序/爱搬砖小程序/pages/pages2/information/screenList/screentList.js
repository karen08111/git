// pages/pages2/information/screenList/screentList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lid:null,
    store:false,
    jobList:null,
    jobZiList:null,
    currentOne:null,
    currentTwo:null,
    cityList:null,//省级城市
    erList:null,//二级城市
    url:null,
    projectList:[],//列表
    http:null,

    jobErId:null,//职位二级id
    souCity:null,//城市id
    nature:null,//团队 还是个人

    redu:false,//热度选项
    page:1,//分页
    height:0,
    top:0,
    isMore: false,
    keywords:null,//关键字
    names:'热度',
    sort:1,//热度
    xus:[{
      id:1,
      title:'热度'
    },{
      id:2,
      title:'发布时间倒序'
    },{
      id:3,
      title:'发布时间正序'
    }],
    big_type:null,//技术一级
    works:null,//技术二级
    province:null,//地区
    teamStore:false,
    teamJob:[],
    teamJobName:'行业分类',
    industry_type:null,//找团队的行业分类id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if(options.title){
      this.setData({
        keywords:options.title
      })
    }
    var request = getApp().globalData.sendRequest
    var http = getApp().globalData.local
    // console.log(options)
    if (options.type =="/resumeList"){
      wx.setNavigationBarTitle({
        title: '找工人',
      })
    } else if (options.type =="/teamList"){
      wx.setNavigationBarTitle({
        title: '找团队',
      })
    } else if (options.type =="/recruitList" && options.nature ==1){
      that.setData({
        nature: options.nature
      })
      wx.setNavigationBarTitle({
        title: '工人找活',
      })
    } else if (options.type == "/recruitList" && options.nature == 2){
      that.setData({
        nature: options.nature
      })
      wx.setNavigationBarTitle({
        title: '团队找活',
      })
    }else {//项目
      wx.setNavigationBarTitle({
        title: '项目信息',
      })
    }
    that.setData({
      url: options.type || '/operate/project/list',
      http: http,
    })
    if(options.title){//请求搜索关键字
      if (options.nature){
        that.serchHuo()
      }else {
        that.serchShu()
      }
    }else if(options.type && !options.title) {
      if (options.nature) {
        that.getHuo()

      } else {
        that.getShu()
      }
    }else {
      console.log('项目')
    }
    
    
    // 获取高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight
        })
      },
    })
  },
  scroll(e){
    this.setData({
      top: e.detail.scrollTop
    })
  },
  // 搜索标题请求
  serchShu() {
    var that = this
    var request = getApp().globalData.sendRequest
    var http = getApp().globalData.local
    request.getReq(that.data.url + "?page=" + that.data.page + "&keywords=" + that.data.keywords + "&sort=" + that.data.sort,res =>{
      if(res.code == 200 ){
        if (res.data.data.length > 0) {
          var newArr = that.data.projectList.concat(res.data.data)
          that.setData({
            projectList: newArr,
            page: parseInt(res.data.current_page) + 1
          })
        } else {
          that.setData({
            isMore: true,
          })
        }
      }
    })
  },
  serchHuo() {
    var that = this
    var request = getApp().globalData.sendRequest
    var http = getApp().globalData.local
    request.getReq(that.data.url + "?nature=" + that.data.nature + "&page=" + that.data.page + "&keywords=" + that.data.keywords + "&sort=" + that.data.sort, res => {
      // console.log(res.data)
      if (res.code == 200) {
        if (res.data.data.length > 0) {
          var newArr = that.data.projectList.concat(res.data.data)
          that.setData({
            projectList: newArr,
            page: parseInt(res.data.current_page) + 1
          })
        } else {
          that.setData({
            isMore: true,
          })
        }

      }
    })
  },
  // 请求数据
  getShu(){
    var that = this
    var request = getApp().globalData.sendRequest
    var http = getApp().globalData.local
    request.getReq(that.data.url + "?page=" + that.data.page + "&sort=" + that.data.sort, res => {
      // console.log(res.data)
      if (res.code == 200) {
        if(res.data.data.length>0){
          var newArr = that.data.projectList.concat(res.data.data)
          that.setData({
            projectList: newArr,
            page: parseInt(res.data.current_page) + 1
          })
        }else {
          that.setData({
            isMore: true,
          })
        }
      }
    })
  },
  // 请求找活
  getHuo(){
    var that = this
    var request = getApp().globalData.sendRequest
    var http = getApp().globalData.local
    request.getReq(that.data.url + "?nature=" + that.data.nature + "&sort=" + that.data.sort + "&page=" + that.data.page, res => {
      // console.log(res.data)
      if (res.code == 200) {
        if(res.data.data.length>0){
          var newArr = that.data.projectList.concat(res.data.data)
          that.setData({
            projectList: newArr,
            page: parseInt(res.data.current_page) + 1
          })
        } else {
          that.setData({
            isMore: true,
          })
        }
        
      }
    })
  },
  pickXu(e) {
    var id = e.currentTarget.dataset.id
    var name  = e.currentTarget.dataset.name
    this.setData({
      names:name,
      redu:false,
      lid:null,
      sort:id,
      page: 1,
      projectList: [],
    })
    var that = this
    this.serch()
    
   
  },
  pickTeamJob(e) {
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    this.setData({
      teamJobName:name,
      page:1,
      lid: null,
      projectList: [],
      teamStore:false,
    })
    if(this.data.nature){
      this.setData({
        works: id,
      })
    }else {
      this.setData({
        industry_type: id,
      })
    }
    this.serch()
  },
  // 查询请求
  serch(){//招聘搜索
  // 初始数据
    // this.setData({
    //   page:1,
    //   projectList: [],
    // })
    var that = this
    var http = getApp().globalData.local
    var data = {
      page:that.data.page,
    }
    var keywords = this.data.keywords
    var sort = this.data.sort
    var big_type = this.data.big_type
    var works = this.data.works
    var province = this.data.province
    var nature = this.data.nature
    var industry_type = this.data.industry_type
    nature ? data['nature'] = nature:''
    keywords ? data['keywords'] = keywords:'';
    sort ? data['sort'] = sort:'';
    big_type ? data['big_type'] = big_type:''
    works ? data['works'] = works:''
    province ? data['province'] = province:''
    industry_type ? data['industry_type'] = industry_type:''
    // console.log(data)
    wx.request({
      url: http + that.data.url,
      data:data,
      success(res){
        // console.log(res)
        if (res.data.code == 200) {
          if (res.data.data.data.length > 0) {
            var newArr = that.data.projectList.concat(res.data.data.data)
            that.setData({
              projectList: newArr,
              page: parseInt(res.data.data.current_page) + 1
            })
            // console.log(that.data.projectList)
          } else {
            that.setData({
              isMore: true,
            })
          }

        }
      }
    })
  },
  // 行业分类
  hangShow(e) {
    let lid = e.currentTarget.dataset.lid
    this.setData({
      store: false,
      lid: lid,
      redu: false,
      teamStore:!this.data.teamStore
    })
    if (!this.data.teamStore) {
      this.setData({
        lid:null
      })
    }
  },
  // 滑动到底部
  bindDownLoad(){
    var that = this;
    // if (!that.data.isMore) {
    //   that.setData({
    //     page: that.data.page + 1
    //   })
    //   that.getXin();
    // }
    // if(!that.data.keywords){
    //   if (!that.data.nature) {
    //     that.getShu()
    //   } else {
    //     that.getHuo()
    //   }
    // }else {
    //   if (!that.data.nature) {
    //     that.serchShu()
    //   } else {
    //     that.serchHuo()
    //   }
    // }
    this.serch();
    
  },
  topLoad(){

  },
  show(e){
    let lid = e.currentTarget.dataset.lid
    // console.log(lid)
    if(lid == 2) {
      this.setData({
        store: !this.data.store,
        lid:lid,
        redu:false,
        teamStore:false,
      })
      if(!this.data.store){
        // 初始化
        this.setData({
          // currentOne:null,
          // currentTwo:null,
          // lid:null,
          // jobZiList:null,
          // erList:null
        })
      }
    }else if(lid ==3) {
      this.setData({
        store: !this.data.store,
        lid: lid,
        redu:false,
        teamStore: false,
      })
      if (!this.data.store) {
        // 初始化
        this.setData({
          // currentOne: null,
          // currentTwo: null,
          // lid: null,
          // jobZiList: null,
          // erList: null
        })
      }
    }else if(lid ==1){
      this.setData({
        store: false,
        lid: lid,
        redu:!this.data.redu,
        teamStore: false,
      })
      if (!this.data.store && !this.data.redu) {
        // 初始化
        this.setData({
          currentOne: null,
          currentTwo: null,
          lid: null,
          jobZiList: null,
          erList: null
        })
      }
    }
    
  },
  selectOne(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      currentOne:index,
      jobZiList: this.data.jobList[index].children,
      jobErId:null,
      currentTwo:null,
    })
   
  },
  selectTwo(e){
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    // console.log(id)
    this.setData({
      currentTwo:index,
      jobErId:id,
    })
  },
  guanbi(){
    this.setData({
      store:false,
      currentOne: null,
      currentTwo: null,
      lid: null,
      jobZiList: null,
      erList: null,
      redu:false,
      teamStore:false,
    })
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
    // 请求数据
    var request = getApp().globalData.sendRequest;
    var that = this
    request.getReq("/common/getworks",res=>{
      // console.log(res.data)
      if(res.code == 200){
        that.setData({
          jobList:res.data,
          // jobZiList:res.data[0].children
        })
      }
    })
    // 请求城市
    request.getReq("/common/getarea",res=>{
      if(res.code == 200) {
        that.setData({
          cityList:res.data
        })
      }
    })
    // 请求行业分类
    request.getReq("/common/classify",res=>{
      if(res.code == 200) {
        that.setData({
          teamJob:res.data
        })
      }
    })
  },
  selectCity(e){
    let id = e.currentTarget.dataset.id
    // console.log(id)
    let index = e.currentTarget.dataset.index
    var request = getApp().globalData.sendRequest;
    var that = this
    request.getReq("/common/getarea/"+id,res=>{
      // console.log(res)
      that.setData({
        currentOne:index,
        currentTwo:null,
        erList:res.data,
        souCity:id,
      })
    })
  },
  selectErCity(e){
    var that = this
    let index = e.currentTarget.dataset.index
    // console.log(e.currentTarget.dataset.id)
    that.setData({
      currentTwo:index,
      souCity: e.currentTarget.dataset.id
    })
  },
  reset(){
    this.setData({
      currentOne: null,
      currentTwo: null,
      jobZiList: null, 
      erList:null,
    })
    if(this.data.lid == 2){
      this.setData({
        big_type:null,
        works:null,
        jobErId:null,
        currentOne:null,
      })

    }else if(this.data.lid == 3) {
      this.setData({
        souCity:null,
        province:null,
      })
    }
  },
  yes(){
    var request = getApp().globalData.sendRequest;
    var that = this
    this.setData({
      page: 1,
      projectList: [],
    })
    // console.log(that.data.lid)  1  2工种 3工作地点
    if(that.data.lid==2){
      if (this.data.currentOne == 0 || this.data.currentOne==1){
        var onId = this.data.currentOne + 1;
      }
      let erId = this.data.jobErId;
      if(onId || erId){
        this.setData({
          big_type: onId,
          works: erId
        })
      }
      
      this.serch();
      this.setData({
        // currentOne: null,
        // currentTwo: null,
        // jobZiList: null,
        // erList: null,
        store: false,
        lid: null,
      }) 
    }else if(that.data.lid==3){
      // console.log(that.data.souCity)
      if (that.data.souCity){
        this.setData({
          province: that.data.souCity
        })
      }
      this.serch();
      this.setData({
        store: false,
        lid: null,
      })
    
    }
    
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