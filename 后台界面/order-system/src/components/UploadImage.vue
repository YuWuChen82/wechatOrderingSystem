<template>
    <el-upload action="#" list-type="picture-card" :auto-upload="false" ref="uploadRef" :on-change="upLoadFile"
        :on-remove="handleRemove" :file-list="fileList" :limit="3" :on-exceed="moreLimit">
        <el-icon>
            <Plus />
        </el-icon>


    </el-upload>

    <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
</template>

<script lang="ts" setup>
import { uploadImageApi } from '@/api/img'
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, UploadFiles, type UploadFile, type UploadUserFile } from 'element-plus'
//注册事件
const emits = defineEmits(['getImg'])

// 图片上传组件的属性
const uploadRef = ref<any>()
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
type PropType = {
    fileList: UploadUserFile[];
    newImgUrl: Array<{ url: string }>;
}
//接收父组件传递的参数
const props = withDefaults(defineProps<PropType>(), {
    fileList: () => [],
    newImgUrl: () => [],
})
//返回父组件的值
const newImgUrlCopy = ref<Array<{ url: string }>>([])
//删除图片
const handleRemove = (file: UploadFile) => {
    newImgUrlCopy.value = props.newImgUrl
    newImgUrlCopy.value = newImgUrlCopy.value.filter(item => item.url !== file.name);
    emits("getImg", newImgUrlCopy.value);
}
//文件个数超出
const moreLimit = (_files: File[], upLoadFiles: UploadFiles) => {
    ElMessage.warning('最多只能上传' + upLoadFiles.length + '张图片！')
}

//上传数据的提交
const upLoadFile = async (file: any) => {
    newImgUrlCopy.value = props.newImgUrl
    //判断选择的图片是不是图片类型
    const typeArr = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg']
    const isImg = typeArr.indexOf(file.raw.type) !== -1;
    const isMore3M = file.size / 1024 / 1024 < 3;
    if (!isImg) {
        ElMessage.warning('只能上传图片类型！')
        uploadRef.value?.clearFiles()
        return;
    }
    if (!isMore3M) {
        ElMessage.warning('图片大小不能超过3M！')
        uploadRef.value?.clearFiles()
        return;
    }
    // 组装上传的数据
    const formData = new FormData()
    formData.append('file', file.raw)
    // 发送上传请求
    const res = await uploadImageApi(formData)
    if (res && res.code == 200 && res.data) {
        ElMessage.success("图片上传成功！")
        file.name = process.env.BASE_API + res.data
        //设置到返回子组件的数据里
        newImgUrlCopy.value.push({
            url: process.env.BASE_API + res.data
        })
        emits('getImg', newImgUrlCopy.value)
    }
}

</script>