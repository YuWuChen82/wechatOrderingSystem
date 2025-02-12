<script setup>
import Menu from "./Menu.vue"
import Header from "@/layout/header/Header.vue"
</script>

<template>
    <div class="common-layout">
        <el-container class="common-layout">
            <el-aside width="auto">
                <Menu></Menu>
            </el-aside>

            <el-container>
                <el-header class="custom-header">
                    <Header></Header>
                </el-header>

                <el-main class="custom-main">
                    <RouterView></RouterView>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style lang="scss" scoped>
.common-layout {
    height: 100%;

    .el-aside {
        background-color: #304156;
    }

    .custom-header {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #d8dce5 !important;
        justify-content: space-between;


    }


    .custom-main {
        padding: 0px;
    }
}
</style>
