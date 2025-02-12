<template>
    <el-dropdown>
        <span class="el-dropdown-link">
            <div class="user-avatar">
                <el-icon size="48" color="#fff">
                    <UserFilled />
                </el-icon>
            </div>

        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">

</script>

<style scoped>
.el-dropdown-link:focus {
    outline: none;
}

.user-avatar {
    background-color: #000000a4;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    text-align: center;
}

.user-avatar>.el-icon {
    margin-top: 7px;
}
</style>