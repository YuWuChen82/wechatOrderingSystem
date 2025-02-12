import { UserModel } from '@/api/user/UserModel'
import { EditType, FuncList } from '@/type/baseType'
import { ref } from 'vue'
import { deleteUserApi } from '@/api/user/index'
import useInstance from '@/hooks/useInstance'
import { ElMessage } from 'element-plus'
export function useUser(getList: FuncList) {
    const { global } = useInstance()
    //新增
    const addBtn = () => {
        addRef.value?.show(EditType.ADD)
    }
    //编辑
    const editBtn = (row: UserModel) => {
        addRef.value?.show(EditType.EDIT, row)
    }
    //删除
    const deleteBtn = async (row: UserModel) => {
        let confirm = await global.$myconfirm('确定删除该数据吗？')
        if (confirm) {
            let res = await deleteUserApi(row.userId)
            if (res && res.code == 200) {
                ElMessage.success(res.msg);
                getList();
            }
        }
    }
    const addRef = ref<{ show: (type: string, row?: UserModel) => void }>(null!)
    return { addBtn, editBtn, deleteBtn, addRef }
}