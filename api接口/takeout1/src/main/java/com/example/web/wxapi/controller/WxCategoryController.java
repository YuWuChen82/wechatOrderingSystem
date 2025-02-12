package com.example.web.wxapi.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.utils.ResultUtils;
import com.example.utils.ResultVo;
import com.example.web.banner.entity.SysBanner;
import com.example.web.banner.service.SysBannerService;
import com.example.web.category.entity.SysCategory;
import com.example.web.category.service.SysCategoryService;
import com.example.web.goods.entity.SysGoods;
import com.example.web.goods.service.SysGoodsService;
import com.example.web.goods_specs.entity.SysGoodsSpecs;
import com.example.web.goods_specs.service.SysGoodsSpecsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/wxapi/category")
public class WxCategoryController {

    @Autowired
    private SysGoodsService sysGoodsService;
    @Autowired
    private SysCategoryService sysCategoryService;
    @Autowired
    private SysGoodsSpecsService sysGoodsSpecsService;
    //分类数据
    @GetMapping("/getCategoryList")
    public ResultVo getGoodsList() {
        QueryWrapper<SysCategory> query = new QueryWrapper<>();
        query.lambda().orderByAsc(SysCategory::getOrderNum);
        List<SysCategory> list = sysCategoryService.list(query);
        if(list.size() > 0){
            for (SysCategory category : list){
                //查询价格
                QueryWrapper<SysGoods> queryWrapper = new QueryWrapper<>();
                queryWrapper.lambda().eq(SysGoods::getCategoryId, category.getCategoryId()).orderByAsc(SysGoods::getOrderNum);
                List<SysGoods> goods = sysGoodsService.list(queryWrapper);
                category.setGoods(goods);
                if(!goods.isEmpty()){
                    for (SysGoods good : goods){
                        //查询价格
                        QueryWrapper<SysGoodsSpecs> queryWrapperPrice = new QueryWrapper<>();
                        queryWrapperPrice.lambda().eq(SysGoodsSpecs::getGoodsId, good.getGoodsId()).orderByAsc(SysGoodsSpecs::getOrderNum);
                        List<SysGoodsSpecs> specs = sysGoodsSpecsService.list(queryWrapperPrice);
                        good.setSpecs(specs);
                    }
                }
            }
        }
        return ResultUtils.success("查询成功",list);
    }
}
