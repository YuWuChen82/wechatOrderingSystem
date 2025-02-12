<template>
    <SysDialog :title="dialog.title" :visible="dialog.visible" :width="dialog.width" :height="dialog.height"
        @onClose="onClose" @onConfirm="commit">
        <template #content>
            <el-form :model="addModel" ref="addFormRef" :rules="rules" label-width="80px" :inline="false"
                size="default">
                <el-form-item prop="title" label="标题：">
                    <el-input v-model="addModel.title" placeholder="请输入广告标题"></el-input>
                </el-form-item>
                <el-form-item prop="goodsId" label="菜品：">
                    <el-select v-model="addModel.goodsId" placeholder="请选择菜品" size="default" style="width: 100%;">
                        <el-option v-for="item in selectData" :key="item['value']" :label="item['label']"
                            :value="item['value']" />
                    </el-select>
                </el-form-item>
                <el-form-item prop="orderNum" label="序号：">
                    <el-input type="number" v-model="addModel.orderNum"></el-input>
                </el-form-item>
                <el-form-item prop="status" label="上下架：">
                    <el-radio-group v-model="addModel.status">
                        <el-radio value="1">上架</el-radio>
                        <el-radio value="0">下架</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="菜品图片" prop="images">
                    <UploadImage @get-img="getImg" :file-list="fileList" :newImgUrl="imgUrl"></UploadImage>
                </el-form-item>
            </el-form>

        </template>
    </SysDialog>
</template>

<script setup lang="ts">
import SysDialog from '@/components/SysDialog.vue'
import useDialog from '@/hooks/useDialog';
import useSelectGoods from '@/composables/banner/useSelectGoods';
import { BannerModel } from '@/api/banner/BannerModel.ts';
import { nextTick, reactive, ref } from 'vue';
import { FormInstance, UploadUserFile } from "element-plus";
import { addApi, editApi } from '@/api/banner/index'
import { ElMessage } from "element-plus";
import { EditType } from '@/type/baseType';
import UploadImage from "@/components/UploadImage.vue";
import resetModel from '@/hooks/resetModel';

//图片初始值
const fileList = ref<Array<UploadUserFile>>([])
//图片地址
const imgUrl = ref<Array<{ url: string }>>([])
//接收图片上传的地址
const getImg = (NewImgUrl: Array<{ url: string }>) => {
    //把图片路径拼接为逗号分隔的字符串
    imgUrl.value = NewImgUrl;
    console.log(NewImgUrl, "图片组件传过来的Model图片url");

    let url = "";
    for (let k = 0; k < imgUrl.value.length; k++) {
        url = url + imgUrl.value[k].url + ",";
    }
    addModel.images = url.substring(0, url.lastIndexOf(","));

}
// 下拉分类业务
const { selectData, getSelect } = useSelectGoods();
const { dialog, onClose, onShow } = useDialog();
const addFormRef = ref<FormInstance>();
// 显示弹框
const show = async (type: string, row?: BannerModel) => {
    // 清空图片
    nextTick(() => {
        imgUrl.value = [];
        fileList.value = [];  // 直接赋值一个新的空数组
        // 清空表单数据
        resetModel(addModel)

    })
    // 仅在新增时添加规格
    if (type === EditType.ADD) {
        dialog.title = "新增广告";
    }
    await nextTick();
    getSelect();
    dialog.width = 960;
    dialog.height = 560;
    addFormRef.value?.resetFields();
    onShow();
    // 编辑回显
    if (type == EditType.EDIT && row) {
        console.log(row);
        dialog.title = "编辑广告";
        await nextTick(() => {
            Object.assign(addModel, row);
        });
        // 图片回显
        if (addModel.images) {
            // 逗号分隔的字符串转为数组
            let imgs = addModel.images.split(",");
            for (let i = 0; i < imgs.length; i++) {
                let img = {
                    name: '',
                    url: '',
                };
                img.name = imgs[i];
                img.url = imgs[i];

                fileList.value.push(img);
                imgUrl.value.push(img);
            }

        }
    }
    // 设置本次操作是新增还是编辑
    addModel.type = type;
};
//暴露出去
defineExpose({
    show
})
const addModel = reactive<BannerModel>({
    type: "",
    banId: "",
    goodsId: "",
    title: "",
    images: "",
    status: "",
    orderNum: "",

})
const rules = reactive({
    goodsId: [{
        required: true,
        message: '请选择菜品',
        trigger: 'blur'
    }],
    title: [{
        required: true,
        message: '请输入广告标题',
        trigger: 'blur'
    }],
    orderNum: [{
        required: true,
        message: '请输入广告序号',
        trigger: 'blur'
    }],
    status: [{
        required: true,
        message: '请选择上下架',
        trigger: 'blur'
    }],
    images: [{
        required: true,
        message: '请上传广告图片',
        trigger: 'blur'
    }]
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