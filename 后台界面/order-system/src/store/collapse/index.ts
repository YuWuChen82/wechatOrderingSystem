import { defineStore } from "pinia";
import { computed, ref } from "vue";
export const useCollapseStore = defineStore("collapse", () => {

    const collapse = ref(false);
    const getCollapse = computed(() => collapse.value);
    function setCollapse(value: boolean) {
        collapse.value = value;
    }
    return { collapse, getCollapse, setCollapse }

})