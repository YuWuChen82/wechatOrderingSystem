<template>
    <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item v-for="item in tabs">{{ item.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>

</template>

<script setup lang="ts">
import { Ref, onMounted, ref, watch } from 'vue';
import { useRoute, RouteLocationMatched } from 'vue-router';
const route = useRoute();
const tabs: Ref<RouteLocationMatched[]> = ref([]);

watch(() => route.path,
    () => getBreadcrumb()
);
const getBreadcrumb = () => {
    let mached = route.matched.filter(item => item.meta && item.meta.title);
    // const first = mached[0];
    // if (first.path !== '/dashboard') {
    //     mached = [{ path: '/dashboard', meta: { title: '首页' } } as any].concat(mached)
    // }
    tabs.value = mached;
}
onMounted(() => {
    getBreadcrumb()
})
</script>

<style scoped>
.bread {
    margin-left: 20px;
}
</style>