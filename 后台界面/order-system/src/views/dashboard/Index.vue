<template>
    <div>
        <el-button type="primary" size="default" @click="onShow">新增</el-button>
    </div>
    <SysDialog :title="dialog.title" :visible="dialog.visible" :width="dialog.width" :height="dialog.height"
        @onClose="onClose" @onConfirm="onConfirm">
        <template #content>
            弹框测试
        </template>
    </SysDialog>
</template>

<script setup lang="ts">
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
const { dialog, onShow, onClose, onConfirm } = useDialog();
</script>

<style scoped></style>