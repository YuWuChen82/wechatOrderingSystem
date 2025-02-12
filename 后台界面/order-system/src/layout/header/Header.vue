<template>
    <div class="left-header">
        <Collapse />
        <BreadCrumb />
    </div>
    <LoginOut />
</template>

<script setup lang="ts">
import Collapse from './Collapse.vue'
import LoginOut from './LoginOut.vue';
import BreadCrumb from './BreadCrumb.vue';
</script>

<style scoped>
.left-header {
    display: flex;
    align-items: center;
}
</style>