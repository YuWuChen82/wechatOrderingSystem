package com.example.web.goods.service;

import com.example.web.goods.entity.GoodsParm;
import com.example.web.goods.entity.SysGoods;
import com.baomidou.mybatisplus.extension.service.IService;

/**
* @author 陈
* @description 针对表【sys_goods】的数据库操作Service
* @createDate 2024-06-28 11:11:09
*/
public interface SysGoodsService extends IService<SysGoods> {
    //保存
    void saveGoods(GoodsParm parm);
    void editGoods(GoodsParm parm);
    void deleteGoods(Integer goodsId);
}
