import { BannerModel } from '@/api/banner/BannerModel'
import { EditType, FuncList } from '@/type/baseType'
import { ref } from 'vue'
import { deleteApi } from '@/api/banner'
import useInstance from '@/hooks/useInstance'
import { ElMessage } from 'element-plus'
export default function useBanner(getList: FuncList) {
    const { global } = useInstance()
    const addRef = ref<{ show: (type: String, row?: BannerModel) => void }>()
    //新增
    const addBtn = () => {
        addRef.value?.show(EditType.ADD)
    }
    //编辑
    const editBtn = (row: BannerModel) => {
        addRef.value?.show(EditType.EDIT, row)
    }
    //删除
    const deleteBtn = async (row: BannerModel) => {
        const confirm = await global.$myconfirm('确认删除该广告吗？')
        if (confirm) {
            let res = await deleteApi(row.banId)

            if (res && res.code == 200) {
                ElMessage.success(res.msg)
                //刷新列表
                getList()
            }
        }
    }
    return { addBtn, editBtn, deleteBtn, addRef }

}