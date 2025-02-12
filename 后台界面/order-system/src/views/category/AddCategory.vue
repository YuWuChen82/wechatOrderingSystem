<template>
    <SysDialog :title="dialog.title" :visible="dialog.visible" :width="dialog.width" :height="dialog.height"
        @onClose="onClose" @onConfirm="commit">
        <template #content>
            <el-form :model="addModel" ref="addFormRef" :rules="rules" label-width="80px" :inline="false"
                size="default">
                <el-form-item prop="categoryName" label="分类名称">
                    <el-input v-model="addModel.categoryName" placeholder="请输入分类名称."></el-input>
                </el-form-item>
                <el-form-item label="序号" prop="orderNum">
                    <el-input type="number" v-model="addModel.orderNum"></el-input>
                </el-form-item>

            </el-form>

        </template>
    </SysDialog>
</template>

<script setup lang="ts">
import SysDialog from '@/components/SysDialog.vue'
import useDialog from '@/hooks/useDialog';
import { CategoryModel } from '@/api/category/CategoryModel.ts';
import { nextTick, reactive, ref } from 'vue';
import { FormInstance } from "element-plus";
import { addApi, editApi } from '@/api/category/index'
import { ElMessage } from "element-plus";
import { EditType } from '@/type/baseType';

const { dialog, onClose, onShow } = useDialog();
const addFormRef = ref<FormInstance>();
const show = (type: string, row?: CategoryModel) => {
    dialog.title = type == EditType.ADD ? '新增类别' : '编辑类别';
    dialog.height = 150;
    onShow()
    //清空表单
    addFormRef.value?.resetFields();
    addModel.categoryId = '';
    if (row && type === EditType.EDIT) {
        nextTick(() => {
            Object.assign(addModel, row)
        })

    }
    addModel.type = type;


}
//暴露出去
defineExpose({
    show
})
const addModel = reactive<CategoryModel>({
    type: '',//区分新增还是编辑
    categoryId: '',
    categoryName: '',
    orderNum: '',

})
const rules = reactive({
    categoryName: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },

    ],
})
const emits = defineEmits(['onFresh'])
const commit = () => {
    addFormRef.value?.validate(async (valid) => {
        if (valid) {
            let res = null;
            if (addModel.type === EditType.EDIT) {
                res = await editApi(addModel)
            } else {
                res = await addApi(addModel)
            }
            if (res && res.code == 200) {
                ElMessage.success(res.msg);
                emits('onFresh')
                onClose();
            }
        }
    })
}

</script>

<style scoped></style>