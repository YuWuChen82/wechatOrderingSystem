//通常用于定义数据的类型
export type ListUserParm = {
    currentPage: number;
    pageSize: number;
    name: string;
    phone: string;
    total: number;
}

export type UserModel = {
    type: string;//区分新增或者编辑
    userId: string;
    username: string;
    password: string;
    phone: string;
    email: string;
    sex: string;
    name: string;
}