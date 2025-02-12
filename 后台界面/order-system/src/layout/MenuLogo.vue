<template>
    <div class="logo">
        <img :src="MenuLogo" alt="">
        <span v-if="show" class="logo-title">{{ title }}</span>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const title = ref("校园点餐系统")
const MenuLogo = ref('https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png')
import { useCollapseStore } from '@/store/collapse/index'
const store = useCollapseStore()
const show = ref(true)
watch(() => store.getCollapse,
    (val) => {
        if (!val) {
            setTimeout(() => {
                show.value = !val
            }, 300)
        } else {
            show.value = !val
        }
    })
</script>

<style scoped lang="scss">
.logo {
    display: flex;
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    align-items: center;
    background-color: #000;
    cursor: pointer;

    img {
        width: 36px;
        height: 36px;
        margin-right: 12px;
        margin-left: 20px;
    }

    .logo-title {
        color: #fff;
        font-size: 22px;
        font-weight: bold;
        font-family: FangSong;
    }
}
</style>