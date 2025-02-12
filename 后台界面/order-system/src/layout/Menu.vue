<template>
    <MenuLogo />
    <el-menu :router="true" class="el-menu-vertical-demo" background-color="#304156" :default-active="activeIndex"
        :collapse="collapse">
        <!-- <el-menu-item index="/dashboard">
            <el-icon><icon-menu /></el-icon>
            <template #title>首页</template>
</el-menu-item> -->
        <!-- <el-menu-item index="/user">
            <el-icon>
                <UserFilled />
            </el-icon>
            <template #title>用户管理</template>
        </el-menu-item> -->
        <el-menu-item index="/category">
            <el-icon><icon-menu /></el-icon>
            <template #title>菜品分类</template>
        </el-menu-item>
        <el-menu-item index="/goods">
            <el-icon>
                <Memo />
            </el-icon>
            <template #title>菜品管理</template>
        </el-menu-item>
        <el-menu-item index="/order">
            <el-icon>
                <List />
            </el-icon>
            <template #title>订单管理</template>
        </el-menu-item>
        <el-menu-item index="/banner">
            <el-icon>
                <Calendar />
            </el-icon>
            <template #title>广告管理</template>
        </el-menu-item>
        <el-menu-item index="/comment">
            <el-icon>
                <Comment />
            </el-icon>
            <template #title>评论管理</template>
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>
import {
    Menu as IconMenu,
    UserFilled, Comment,
    Memo, List, Calendar,
} from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import MenuLogo from './MenuLogo.vue'
import { computed } from 'vue';
const route = useRoute()
const activeIndex = computed(() => route.path)
import { useCollapseStore } from '@/store/collapse/index'
const store = useCollapseStore()
const collapse = computed(() => store.getCollapse)

</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 230px;
    min-height: 400px;
}

.el-menu {
    border-right: none;
}

.el-menu .el-menu-item {
    color: #bfcbd9;
    font: 15px;
    font-weight: bold;
}

.el-menu-item.is-active {
    color: #409eff !important;
    background-color: #1f2d3d !important;
}

:deep(.el-icon-item:hover) {
    background-color: #001528 !important;
}
</style>