<template>
    <el-icon :size="26" style="cursor: pointer;" @click="iconClick">
        <component :is="status? Expand : Fold "></component>
    </el-icon>
</template>

<script setup lang="ts">
import { Expand, Fold } from '@element-plus/icons-vue'
import { useCollapseStore } from '@/store/collapse/index'
import { computed } from 'vue'
const store = useCollapseStore()
const status = computed(() => store.getCollapse)
const iconClick = () => {
    store.setCollapse(!status.value)
}
</script>

<style scoped></style>