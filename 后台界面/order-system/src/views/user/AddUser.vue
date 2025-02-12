<template>

    <SysDialog :title="dialog.title" :visible="dialog.visible" :width="dialog.width" :height="dialog.height"
        @onClose="onClose" @onConfirm="commit">
        <template #content>
            <el-form :model="addModel" ref="addFormRef" :rules="rules" label-width="80px" :inline="false"
                size="default">
                <el-row :gutter="20">
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="name" label="姓名">
                            <el-input v-model="addModel.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="sex" label="性别">
                            <el-radio-group v-model="addModel.sex">
                                <el-radio value="0">男</el-radio>
                                <el-radio value="1"> 女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="phone" label="电话">
                            <el-input v-model="addModel.phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="email" label="邮箱">
                            <el-input v-model="addModel.email"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="username" label="账户">
                            <el-input v-model="addModel.username"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="password" label="密码">
                            <el-input type="password" v-model="addModel.password"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

        </template>
    </SysDialog>
</template>

<script setup lang="ts">
import SysDialog from "@/components/SysDialog.vue";
import useDialog from "@/hooks/useDialog";
import { reactive, ref, nextTick } from "vue";
import { UserModel } from "@/api/user/UserModel";
import { FormInstance } from "element-plus";
import { addUserApi, editUserApi } from "@/api/user/index";
import { EditType } from "@/type/baseType";
import { ElMessage } from "element-plus";
const { dialog, onClose, } = useDialog();
//暴露给父组件调用

const show = (type: string, row?: UserModel) => {
    //设置弹窗的标题
    dialog.title = type == EditType.ADD ? '新增用户' : '编辑用户';
    //设置弹窗的宽度和高度
    dialog.height = 180;
    dialog.visible = true;
    //传递row，说明是编辑，编辑回显数据
    if (row) {
        nextTick(() => {
            Object.assign(addModel, row);

        })
    } else {
        addModel.userId = '';
    }
    addFormRef.value?.resetFields();
    //设置类型
    addModel.type = type;

}
defineExpose({
    show,

})
const addFormRef = ref<FormInstance>();
const rules = reactive({
    name: [{
        required: true,
        message: '请输入姓名',
        trigger: 'blur'
    }],
    sex: [{
        required: true,
        message: '请选择性别',
        trigger: 'blur'
    }],
    password: [{
        required: true,
        message: '请输入密码',
        trigger: 'blur'
    }],
    phone: [{
        required: true,
        message: '请输入电话',
        trigger: 'blur'
    }],
    username: [{
        required: true,
        message: '请输入账户',
        trigger: 'blur'
    }],
})
const addModel = reactive<UserModel>({
    userId: '',
    username: '',
    password: '',
    phone: '',
    email: '',
    sex: '',
    name: '',
    type: ''

})
//注册事件
const emists = defineEmits(['onFresh'])
//表单提交
const commit = () => {
    addFormRef.value?.validate(async (valid: boolean) => {
        if (valid) {
            let res = null;
            if (addModel.type == EditType.ADD) {
                res = await addUserApi(addModel);
            } else {
                res = await editUserApi(addModel);
            }
            if (res && res.code == 200) {
                ElMessage.success(res.msg);
                //刷新列表
                emists('onFresh');
                onClose();
            }


        }
    })
}
</script>

<style scoped></style>