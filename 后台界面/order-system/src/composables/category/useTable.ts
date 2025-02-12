import { ListCategoryParams } from "@/api/category/CategoryModel";
import { nextTick, onMounted, reactive, ref } from "vue";
import { getListApi } from "@/api/category";
export default function useTable() {

    const tableHeight = ref(0);
    //列表查询的参数
    const listParm = reactive<ListCategoryParams>({
        categoryName: "",
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
    //搜索
    const searchBtn = () => {
        getList();
    }


    //重置
    const resetBtn = () => {
        listParm.categoryName = "";
        listParm.currentPage = 1;
        getList();
    }
    onMounted(() => {
        getList()
        nextTick(() => {
            tableHeight.value = window.innerHeight - 210;
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
    }
}