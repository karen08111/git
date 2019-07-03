<template>
  <div id="map"></div>
</template>

<script>
  export default {
    name: "basicsMap",
    data() {
      return {}
    },
    props: ['coord'],
    methods: {
      init (coord){
        var map = new BMap.Map("map");
        var point = new BMap.Point(...coord.split(','));
        map.centerAndZoom(point, 15);
        var myIcon = new BMap.Icon(require('../../assets/mapicon.png'), new BMap.Size(20, 25), {
          anchor: new BMap.Size(10, 25)
        })
        var marker = new BMap.Marker(point, {
          icon: myIcon
        });
        map.addOverlay(marker);
      }
    },
    watch: {
      coord (val){
        this.init(val)
      }
    },
    mounted (){
      this.init(this.coord)
    }
  }
</script>

<style scoped lang="less">
  #map{
    width: 6.9rem;
    height: 2.5rem;
  }
</style>