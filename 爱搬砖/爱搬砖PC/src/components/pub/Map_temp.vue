<template>
  <div>
    <div :id="el" :style="{width: width+'px',height: height+'px'}"></div>
    <el-dialog
        title="是否确认使用当前选择地址"
        :visible.sync="dialogVisible"
        width="30%">
      <span>{{address}}</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirm">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Map_temp',
  props: {
    el: {
      type: String,
      default: 'map'
    },
    width: {
      type: Number,
      default: 1179
    },
    height: {
      type: Number,
      default: 289
    },
    mapxy: String,
    enableScroll: {
      type: Boolean,
      default: false
    },
    city: {
      type: String,
      default: '杭州市'
    },
    area: {
      type: String,
      default: '滨江区'
    },
    isGetAddress: {
      type: Boolean,
      default: false
    },
    isLoca: {
      type: Boolean,
      defaultt: false
    }
  },
  data () {
    return {
      dialogVisible: false,
      cityName: this.city,
      isFirst: true
    }
  },
  computed: {
    address: {
      get () {
        return this.area
      },
      set (val) {
        this.$emit('update:area', val)
      }
    }
  },
  watch: {
    address () {
      this.location()
    },
    mapxy (val) {
      if (!this.isLoca) {
        this.createMap()
      } else {
        this.location()
      }
    }
  },
  methods: {
    createMap () {
      var map = new BMap.Map(this.el)
      var point = new BMap.Point(...this.mapxy.split(','))
      map.centerAndZoom(point, 15)
      var myIcon = new BMap.Icon(require('../../assets/mapicon.png'), new BMap.Size(20, 25), {
        anchor: new BMap.Size(10, 25)
      })
      var marker = new BMap.Marker(point, {
        icon: myIcon
      })
      map.addOverlay(marker)
      if (this.enableScroll) { map.enableScrollWheelZoom(true) }
    },
    location () {
      const vm = this
      var map = new BMap.Map(this.el)
      if (this.mapxy) { var point = new BMap.Point(...this.mapxy.split(',')) }
      map.enableScrollWheelZoom(true)

      /* 获取城市名 */
      function myFun (result) {
        var cityName = result.name
        map.setCenter(cityName)
        vm.cityName = cityName
      }
      var myCity = new BMap.LocalCity()
      myCity.get(myFun)

      /* 点击获取地点 */
      var geoc = new BMap.Geocoder()
      map.addEventListener('click', e => {
        var pt = e.point
        var xy = pt.lng + ',' + pt.lat
        this.$emit('update:mapxy', xy)
        // map.panTo(pt, 15);
        // var marker = new BMap.Marker(pt);
        // map.addOverlay(marker);
        geoc.getLocation(pt, rs => {
          var addComp = rs.addressComponents
          this.address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber
          // this.dialogVisible = true
        })
      })

      /* 根据地点获取坐标 */
      var myGeo = new BMap.Geocoder()
      myGeo.getPoint(vm.address, function (point) {
        if (point) {
          var xy = point.lng + ',' + point.lat
          vm.$emit('update:mapxy', xy)
          var marker = new BMap.Marker(point)
          map.addOverlay(marker)
          map.panTo(point, 15)
        }
      },
      vm.city)

      /* 定位浏览器坐标 */
      if (this.isFirst && !this.mapxy) {
        var geolocation = new BMap.Geolocation()
        this.isFirst = false
        geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point)
            map.addOverlay(mk)
            map.panTo(r.point, 15)
            let xy = r.point.lng + ',' + r.point.lat
            vm.$emit('update:mapxy', xy)
          } else {
            alert('failed' + this.getStatus())
          }
        })
      }

      map.centerAndZoom(point, 15)
    },
    confirm () {
      this.$emit('changeAddress', this.address)
      // this.dialogVisible = false
    }
  },
  mounted () {
    if (this.isLoca) {
      this.location()
    } else {
      this.createMap()
    }
  }
}
</script>

<style scoped lang="less">

</style>
