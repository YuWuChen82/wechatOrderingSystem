<template>


    <el-dialog :model-value="props.visible" :title="props.title" :width="props.width + 'px'" :append-to-body="true"
        :before-close="onClose">
        <div class="container" :style="{ height: props.height + 'px' }">
            <slot name="content">
                未传递内容
            </slot>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="danger" @click="onClose">取消</el-button>
                <el-button type="primary" @click="onConfirm">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>

interface DialogProps {
    title?: string,
    visible: boolean,
    width?: number
    height?: number
}
//子组件接收父组件传递的参数
//withDeafults方法用于设置默认值
const props = withDefaults(defineProps<DialogProps>(), {
    title: '未传递空标题',
    visible: false,
    width: 600,
    height: 280
})
//注册事件
const emits = defineEmits(['onClose', 'onConfirm'])
const onClose = () => {
    emits('onClose')
}
const onConfirm = () => {
    emits('onConfirm')
}
</script>

<style lang="scss">
.container {
    overflow-x: initial;
    overflow: auto;
}

.el-dialog {
    border-top-left-radius: 7px !important;
    border-top-right-radius: 7px !important;
    padding: 0px;

    .el-dialog__header {
        margin-left: 0px;
        padding: 0px;
        padding-left: 10px;
        height: 48px;
        border-top-left-radius: 7px !important;
        border-top-right-radius: 7px !important;
        background-color: #009688 !important;
        display: flex;

        .el-dialog__title {
            display: flex;
            align-items: center;
            color: #fff;
            font-size: 16px;
            font-weight: 600;
        }
    }



    .el-dialog__headerbtn {
        .el-dialog__close {
            color: #fff;
        }
    }

    .el-dialog__body {
        padding: 10px;
    }

    .el-dialog__footer {
        border-top: 1px solid #e8eaec !important;
        padding: 10px;
    }
}
</style>