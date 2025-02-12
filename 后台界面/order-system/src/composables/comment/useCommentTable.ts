import { CommentListParams } from "@/api/comment/CommentModel";
import { nextTick, onMounted, reactive, ref } from "vue";
import { getListApi, deleteApi } from "@/api/comment";
import { ElMessage } from 'element-plus'
import useInstance from '@/hooks/useInstance'

export default function useCommentTable() {
    const { global } = useInstance()

    const tableHeight = ref(0);
    //列表查询的参数
    const listParm = reactive<CommentListParams>({
        currentPage: 1,
        pageSize: 10,
        total: 0,

    })
    //表格数据
    const tableList = ref([])

    //列表查询
    const getList = async () => {
        let res = await getListApi(listParm);
        if (res && res.code == 200) {
            tableList.value = res.data.records;
            listParm.total = res.data.total;
        }

    }
    //删除
    const deleteBtn = async (commentId: number) => {
        const confirm = await global.$myconfirm('确认删除该评论吗？')
        if (confirm) {
            let res = await deleteApi(commentId)

            if (res && res.code == 200) {
                ElMessage.success(res.msg)
                //刷新列表
                getList()
            }
        }
    }
    //搜索
    const searchBtn = () => {
        getList();
    }


    //重置
    const resetBtn = () => {
        listParm.currentPage = 1;
        getList();
    }
    onMounted(() => {
        getList()
        nextTick(() => {
            tableHeight.value = window.innerHeight - 160;
        })
    })
    //页容量改变触发的函数
    const sizeChange = (size: number) => {
        listParm.pageSize = size;
        getList();
    }
    //页码改变触发的函数
    const currentChange = (page: number) => {
        listParm.currentPage = page;
        getList();
    }
    return {
        listParm,
        getList,
        searchBtn,
        resetBtn,
        tableList,
        sizeChange,
        currentChange,
        tableHeight,
        deleteBtn
    }
}