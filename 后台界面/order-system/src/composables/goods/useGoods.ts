import { GoodsType } from '@/api/goods/GoodsModel'
import { EditType, FuncList } from '@/type/baseType'
import { ref } from 'vue'
import { deleteApi } from '@/api/goods'
import useInstance from '@/hooks/useInstance'
import { ElMessage } from 'element-plus'
export default function useGoods(getList: FuncList) {
    const { global } = useInstance()
    const addRef = ref<{ show: (type: string, row?: GoodsType) => void }>()
    //新增
    const addBtn = () => {
        addRef.value?.show(EditType.ADD)
    }
    //编辑
    const editBtn = (row: GoodsType) => {
        addRef.value?.show(EditType.EDIT, row)
    }
    //删除
    const deleteBtn = async (row: GoodsType) => {
        let confirm = await global.$myconfirm('确认删除该菜品？')
        if (confirm) {
            let res = await deleteApi(row.goodsId)
            if (res && res.code == 200) {
                ElMessage.success(res.msg);
                getList();
            }
        }

    }
    return { addBtn, editBtn, deleteBtn, addRef }
}