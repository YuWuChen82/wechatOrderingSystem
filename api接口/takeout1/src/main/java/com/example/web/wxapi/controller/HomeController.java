package com.example.web.wxapi.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.utils.ResultUtils;
import com.example.utils.ResultVo;
import com.example.web.banner.entity.SysBanner;
import com.example.web.banner.service.SysBannerService;
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
@RequestMapping("/api/home")
public class HomeController {
    @Autowired
    private SysBannerService sysBannerService;

    @Autowired
    private SysGoodsService sysGoodsService;

    @Autowired
    private SysGoodsSpecsService sysGoodsSpecsService;

    //首页轮播图
    @GetMapping("/getSwipperList")
    public ResultVo getSwiperList() {
        QueryWrapper<SysBanner> query = new QueryWrapper<>();
        query.lambda().eq(SysBanner::getStatus, "1");
        List<SysBanner> bannerList = sysBannerService.list(query);
        return ResultUtils.success("查询成功",bannerList);
    }

    //首页热推
    @GetMapping("/getHotList")
    public ResultVo getHotList() {
        QueryWrapper<SysGoods> query = new QueryWrapper<>();
        query.lambda().eq(SysGoods::getStatus, "1").orderByAsc(SysGoods::getOrderNum);
        List<SysGoods> list = sysGoodsService.list(query);
        if(list.size() > 0){
            for (SysGoods good : list){
                //查询价格
                QueryWrapper<SysGoodsSpecs> queryWrapper = new QueryWrapper<>();
                queryWrapper.lambda().eq(SysGoodsSpecs::getGoodsId, good.getGoodsId()).orderByAsc(SysGoodsSpecs::getOrderNum);
                List<SysGoodsSpecs> specs = sysGoodsSpecsService.list(queryWrapper);
                good.setSpecs(specs);
            }
        }
        return ResultUtils.success("查询成功",list);
    }
}
