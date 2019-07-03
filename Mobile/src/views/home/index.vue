<template>
    <div class="demo">
        <Button type="primary" @click="$router.push('/detail')">home</Button>
        <a href="">试一下</a>
    </div>
</template>

<script>
    import wave from '@/directive/waves'
    import { Button } from 'vant';
    export default {
        components:{
            Button
        },
        directives:{
            wave
        },
        mounted() {

        }
    }
</script>

<style scoped lang="less">
.demo {
    a {
        font-size: 16px;
    }
}
</style>
