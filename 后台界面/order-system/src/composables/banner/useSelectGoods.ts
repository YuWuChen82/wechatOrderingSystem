import { getSelectApi } from "@/api/goods";
import { ref } from "vue";

export default function useSelectGoods() {
    // 下拉数据
    const selectData = ref([]);
    // 获取数据
    const getSelect = async () => {
        let res = await getSelectApi();
        if (res && res.code === 200) {
            selectData.value = res.data;
        }
    }
    return {
        selectData,
        getSelect
    }
}