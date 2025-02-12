//定义列表查询的参数类型
export type ListCategoryParams = {
    currentPage: number;
    pageSize: number;
    categoryName: string;
    total: number;
}
//新增分类的数据类型
export type CategoryModel = {
    type: string;//区分新增还是编辑
    categoryId: string;
    categoryName: string;
    orderNum: number | string;

}