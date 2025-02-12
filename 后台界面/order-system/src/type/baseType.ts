//通用函数类型
export type FuncList = () => any;
//弹窗标题
export enum Title {
    ADD = '新增',
    EDIT = '编辑',
}
//新增和编辑的状态
export enum EditType {
    ADD = '0',
    EDIT = '1',
}
// 图片上传的数据类型
export type NewType = {
    newImgUrl: Array<{ url: string }>;
    deleteUrl: Array<{ url: string }>;
}


