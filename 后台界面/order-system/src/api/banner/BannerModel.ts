//定义列表查询的参数类型
export type ListBannerParams = {
    currentPage: number;
    pageSize: number;
    title: string;
    total: number;
}
//新增分类的数据类型
export type BannerModel = {
    type: string;//区分新增还是编辑
    banId: string;
    goodsId: string;
    title: string;
    images: string;
    status: string;
    orderNum: number | string;

}