// components/screeningForm/screeningForm.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    fenlei:{
      type:Object
    },
    cityList:{
      type:Object
    },
    shengList:{
      type:Array
    },
    shiList:{
      type:Array
    },
    xianList:{
      type:Array
    },
    lare:{
      type:Array
    },
    endId:{
      type:Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animation: null,
    show: false,
    btnList: [
      {
        id: 1,
        name: '找个人',
        store: false
      },
      {
        id: 2,
        name: '找团队',
        store: false
      }
    ],
    id1:null,
    id2:null,
    id3:null,
    id4:null,
    id5:null,
    cityList2:null,
    btnListTwo: [
      {
        id: 1,
        name: '技术工种',
        store: false
      },
      {
        id: 2,
        name: '司机/驾驶员',
        store: false
      }
    ],
    twoBtnList: [],
    shows: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['时', '天', '月'],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    indexCity:null,
    shiIndex:null,
    shengList:null,
    xianIndex:null,
    max:[],
    maxIndex:null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 筛选
    filter: function (e) { //点击筛选事件
      var animation = wx.createAnimation({//创建动画
        duration: 1000,
        timingFunction: 'ease',
        width: 300,
        height: 800,
        top: 0,
        bottom: 0,
        right: 0,
        backgroundColor: '#fff',
        opcity: 0.5
      })

      this.animation = animation

      animation.translateX(-100 + 'vh').step() //动画效果向右滑动100vh

      this.setData({
        animationData: animation.export(),
        show: true
      })
    },
    bindPickerChange:function(e){
      // console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        indexCity: e.detail.value
      })
      this.triggerEvent("shengName", this.data.shengList[e.detail.value])
    },
    bindShi:function(e){
      this.setData({
        shiIndex:e.detail.value
      })
      this.triggerEvent("shiName", this.data.shiList[e.detail.value])
    },
    bindXian:function(e){
      // console.log(e.detail)
      this.setData({
        xianIndex:e.detail.value
      })
      this.triggerEvent("xianValue", e.detail.value)
    },
    getMin:function(e){
      let arrs = []
      this.setData({
        minIndex:e.detail.value
      })
      // console.log(this.data.lare[e.detail.value])
      if(this.data.lare[e.detail.value]=='面议'){
        // let arr=[];
        arrs.push('面议')
        this.setData({
          max:arrs,
          maxIndex:0
        })
      }else{
       
        for(let i=this.data.lare[e.detail.value];i<50;i++){
          arrs.push(i)
          // console.log(arrs)
        }
        // console.log(arrs)
        this.setData({
          max:arrs
        })
        // console.log(this.data.max)
      }
    },
    getMax:function(e){
      this.setData({
        maxIndex:e.detail.value
      })
    },
    // 表单提交
    formSubmit: function (e) {
      // console.log(this.data.id1, this.data.id2, this.data.id3, this.data.endId, this.data.lare[this.data.minIndex],this.data.max[this.data.maxIndex])
      if (this.data.id1 && this.data.id2 && this.data.id3 && this.data.endId){
        var newObj = {
          one: this.data.id1,
          er1: this.data.id2,
          er2: this.data.id3,
          city: this.data.endId,
          min: this.data.lare[this.data.minIndex],
          max: this.data.max[this.data.maxIndex]
        }

        this.triggerEvent('souObj', newObj)
      }else{
        wx.showToast({
          icon:'none',
          title: '请选择完整',
        })
      }
      
    },
    formReset: function () {
      let arr=this.data.fenlei;
      let newArr=[]
      for(let i=0;i<arr.length;i++){
        newArr.push(this.chongzhi(arr[i]))
      }
      this.setData({
        btnList: this.chongzhi(this.data.btnList),
        twoBtnList: this.chongzhi(this.data.twoBtnList),
        btnListTwo:this.chongzhi(this.data.btnListTwo),
        cityList: this.chongzhi(this.data.cityList),
        cityList2: [],
        fenlei:newArr
      })
      this.setData({
        id1:null,
        id2:null,
        id3:null,
        endId:null,
      })

    },
    // 单选按钮
    targetBtn: function (e) {
      let father = e.currentTarget.dataset.father;
      let index = e.currentTarget.dataset.index;
      let newFather = this.chanxuan(father, index);
      let id=e.currentTarget.dataset.id;
      // 修改当前数组
      this.setData({
        btnList: newFather,
        id1:id
      })
    },
    targetBtnTwo:function(e){
      let father = e.currentTarget.dataset.father;
      let index = e.currentTarget.dataset.index;
      let newFather = this.chanxuan(father, index);
      let id = e.currentTarget.dataset.id;
      // 修改当前数组
      this.setData({
        btnListTwo: newFather,
        id2:id
      })
    },
    targetBtn1:function(e){
      let father = e.currentTarget.dataset.father;
      let index = e.currentTarget.dataset.index;
      let newFather = this.chanxuan(father, index);
      let id = e.currentTarget.dataset.id;
      let arr=this.data.fenlei
      arr[0]=newFather
      for(let i=0;i<arr[1].length;i++){
        arr[1][i].store=false
      }
      // 修改当前数组
      this.setData({
        fenlei:arr,
        id3:id
      })
    },
    targetBtn2:function(e){
      let father = e.currentTarget.dataset.father;
      let index = e.currentTarget.dataset.index;
      let newFather = this.chanxuan(father, index);
      let id = e.currentTarget.dataset.id;
      let arr = this.data.fenlei
      arr[1] = newFather
      for (let i = 0; i < arr[0].length; i++) {
        arr[0][i].store = false
      }
      // 修改当前数组
      this.setData({
        fenlei: arr,
        id3: id
      })
    },
    // 省份
    city1:function(e){
      let father = e.currentTarget.dataset.father;
      let index = e.currentTarget.dataset.index;
      let newFather = this.chanxuan(father, index);
      let id = e.currentTarget.dataset.id;
      this.setData({
        cityList: newFather,
        id4:id//省份id
      })
      // 请求市级城市
      const http = getApp().globalData.local
      var request = getApp().globalData.sendRequest;
      var that = this
      that.setData({
        http: http
      })
      request.sendRequest('/common/getarea/'+id,'get').then(res=>{
        if(res.data.code==200){
          let shi=res.data.data
          for(let i=0;i<shi.length;i++){
            shi[i].store=false
          }
          that.setData({
            cityList2:shi
          })
          // console.log(shi)
        }
      })
    },
    city2:function(e){
      let father = e.currentTarget.dataset.father;
      let index = e.currentTarget.dataset.index;
      let newFather = this.chanxuan(father, index);
      let id = e.currentTarget.dataset.id;
      this.setData({
        cityList2: newFather,
        id5: id//省份id
      })
    },
    // 多选按钮
    duo: function (e) {
      let father = e.currentTarget.dataset.father;
      let index = e.currentTarget.dataset.index;
      let newFather = this.duoxuan(father, index);
      this.setData({
        twoBtnList: newFather
      })
    },
    // 封装重置
    chongzhi: function (arr) {
      // console.log(arr)
      for (let i = 0; i < arr.length; i++) {
        arr[i].store = false;
      }
      return arr;
    },
    // 封装重复调用单选
    chanxuan: function (father, index) {
      for (let i = 0; i < father.length; i++) {
        if (i != index) {
          father[i].store = false;
        } else {
          father[index].store = true;
        }
      }

      return father;
    },
    // 封装复用多选
    duoxuan: function (father, index) {
      let s = false;
      if (father[index].store) {
        father[index].store = s;
      } else {
        father[index].store = true;
      }
      return father;
    },
    // 点击下拉显示框
    selectTap() {
      // console.log(1);
      this.setData({
        shows: !this.data.shows
      });
    },
    // 点击下拉列表
    optionTap(e) {
      let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
      this.setData({
        index: Index,
        shows: !this.data.shows
      });
    },
  }
})
