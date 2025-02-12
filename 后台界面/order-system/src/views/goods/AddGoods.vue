<template>
    <SysDialog :title="dialog.title" :visible="dialog.visible" :width="dialog.width" :height="dialog.height"
        @onClose="onClose" @onConfirm="commit">
        <template #content>

            <el-form :model="addModel" ref="addFormRef" :rules="rules" label-width="80px" :inline="false"
                size="default">
                <el-row>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="categoryId" label="菜品分类">
                            <el-select v-model="addModel.categoryId" placeholder="请选择分类" size="default"
                                style="width: 100%;">
                                <el-option v-for="item in selectData" :key="item['value']" :label="item['label']"
                                    :value="item['value']" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0"><el-form-item prop="goodsName" label="菜品名称">
                            <el-input v-model="addModel.goodsName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="orderNum" label="菜品序号">
                            <el-input v-model="addModel.orderNum"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="status" label="是否热推">
                            <el-radio-group v-model="addModel.status">
                                <el-radio value="1">是</el-radio>
                                <el-radio value="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="菜品单位" prop="goodsUnit">
                    <el-input v-model="addModel.goodsUnit"></el-input>
                </el-form-item>
                <el-form-item label="菜品规格" prop="specs">
                    <el-row>

                        <el-col :span="12" :offset="0" style="display: flex;align-items: center;">
                            <el-button style="margin-left: 20px;" type="primary" :icon="Plus" size="small"
                                @click="addSpecs" plain>添加规格</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>


                <el-form-item v-for="num in addModel.specs.length" size="small" :key="num">
                    <el-row>
                        <el-col :span="7" :offset="0">
                            <el-form-item :label="'名称' + num" size="small">
                                <el-input v-model="addModel.specs[num - 1].specsName"></el-input>
                            </el-form-item>

                        </el-col>
                        <el-col :span="7" :offset="0">
                            <el-form-item :label="'价格' + num" size="small">
                                <el-input v-model="addModel.specs[num - 1].goodsPrice"></el-input>
                            </el-form-item></el-col>
                        <el-col :span="7" :offset="0">
                            <el-form-item :label="'序号' + num" size="small">
                                <el-input v-model="addModel.specs[num - 1].orderNum"></el-input>
                            </el-form-item></el-col>
                        <el-col :span="3" :offset="0">
                            <el-button style="margin-left: 10px;" :icon="Close" circle type="danger" size="small" plain
                                @click="deleteSpecs(num)"></el-button>
                        </el-col>
                    </el-row>

                </el-form-item>

                <el-form-item label="菜品图片" prop="goodsImage">
                    <UploadImage @get-img="getImg" :file-list="fileList" :newImgUrl="imgUrl"></UploadImage>
                </el-form-item>
                <el-form-item prop="goodsDesc" label="菜品详情">
                    <div style="border: 1px solid #ccc">
                        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef"
                            :defaultConfig="toolbarConfig" :mode="mode" />
                        <Editor style="height: 250px; overflow-y: hidden;" v-model="valueHtml"
                            :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" />
                    </div>
                </el-form-item>

            </el-form>
        </template>
    </SysDialog>
</template>

<script setup lang="ts">
import useSelectCategory from '@/composables/goods/useSelectCategory'
import UploadImage from "@/components/UploadImage.vue";
import { GoodsType, SpecsType } from "@/api/goods/GoodsModel";
import SysDialog from "@/components/SysDialog.vue";
import useDialog from '@/hooks/useDialog';
import resetModel from '@/hooks/resetModel';
import { reactive, ref, watch, nextTick } from "vue";
import { ElMessage, FormInstance, UploadUserFile } from "element-plus";
import { EditType } from '@/type/baseType';
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import useEditor from '@/composables/goods/useEditor'
import { Plus, Close } from '@element-plus/icons-vue/global';
import { addApi, editApi } from "@/api/goods/";
//编辑器
const { editorRef,
    valueHtml,
    toolbarConfig,
    editorConfig,
    handleCreated, mode } = useEditor()
// 表单的ref属性
const addFormRef = ref<FormInstance>();
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
    addModel.goodsImage = url.substring(0, url.lastIndexOf(","));

}
// 弹框属性
const { dialog, onClose, onShow } = useDialog();
// 下拉分类业务
const { selectData, getSelect } = useSelectCategory();
// 显示弹框
const show = async (type: string, row?: GoodsType) => {
    // 清空图片
    nextTick(() => {
        imgUrl.value = [];
        fileList.value = [];  // 直接赋值一个新的空数组
        // 清空表单数据
        resetModel(addModel)
        addSpecs();

    })
    // 仅在新增时添加规格
    if (type === EditType.ADD) {
        dialog.title = "新增菜品";
    }
    // 清空编辑器
    if (editorRef.value) {
        editorRef.value.clear();
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

        dialog.title = "编辑菜品";
        await nextTick(() => {
            Object.assign(addModel, row);
        });
        // 图片回显
        if (addModel.goodsImage) {
            // 逗号分隔的字符串转为数组
            let imgs = addModel.goodsImage.split(",");
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

        // 编辑器回显
        valueHtml.value = addModel.goodsDesc;
    }
    // 设置本次操作是新增还是编辑
    addModel.type = type;
};

//暴露出去给外部使用
defineExpose({
    show,
})
// 表单绑定的对象
const addModel = reactive<GoodsType>({
    type: '',
    goodsId: '',
    goodsName: '',
    goodsDesc: '',
    goodsImage: '',
    categoryId: '',
    status: '',
    goodsUnit: '',
    orderNum: '',
    specs: [],
})
//菜品详情验证
const checkEdit = (_rule: any, _value: any, callback: any) => {
    if (editorRef.value.getText().length == 0) {
        callback(new Error('请填写菜品详情'))
    } else {
        callback()
    }
}
//规格验证
const checkSpecs = (_rule: any, _value: any, callback: any) => {
    if (addModel.specs.length == 0) {
        callback(new Error('请填写规格'))
    } else {
        let tag = false;
        addModel.specs.forEach((item: SpecsType) => {
            if (!item.specsName) {
                tag = false;
                callback(new Error('请填写规格名称'))
            } else if (!item.goodsPrice) {
                tag = false;
                callback(new Error('请填写规格价格'))
            } else if (!item.orderNum) {
                tag = false;
                callback(new Error('请填写规格序号'))
            } else {
                tag = true;
            }
        })
        if (tag) {
            callback();
        }

    }
}

// 表单验证规则
const rules = reactive({
    categoryId: [{
        required: true,
        message: '请选择分类',
        trigger: 'blur'
    }],
    goodsName: [{
        required: true,
        message: '请填写菜品名称',
        trigger: 'blur'
    }],
    goodsUnit: [{
        required: true,
        message: '请填写单位',
        trigger: 'blur'
    }],
    orderNum: [{
        required: true,
        message: '请填写序号',
        trigger: 'blur'
    }],
    goodsDesc: [{
        required: true,
        validator: checkEdit,
        trigger: 'blur'
    }],
    goodsImage: [{
        required: true,
        message: '请上传菜品图片',
        trigger: 'blur'
    }],
    status: [{
        required: true,
        message: '请选择是否热推',
        trigger: 'blur',
    }],
    specs: [{
        required: true,
        validator: checkSpecs,
        trigger: 'blur',
    }]
})

//获取编辑器的数据
watch(
    valueHtml,
    (value) => {

        addModel.goodsDesc = value
    }
)
// 添加规格
const addSpecs = () => {
    addModel.specs.push({
        specsName: '',
        goodsPrice: '',
        orderNum: '',
    })
}
//删除规格
const deleteSpecs = (index: number) => {
    addModel.specs.splice(index - 1, 1)
}
const emits = defineEmits(['onFresh'])
//提交表单
const commit = () => {
    addFormRef.value?.validate().then(async (valid) => {
        if (valid) {
            let res = null;
            if (addModel.type == EditType.EDIT) {
                res = await editApi(addModel);
            } else {
                res = await addApi(addModel);
            }
            if (res && res.code == 200) {
                ElMessage.success(res.msg)
                emits('onFresh')

                onClose()
            }

        }

    })

}
</script>

<style scoped></style>