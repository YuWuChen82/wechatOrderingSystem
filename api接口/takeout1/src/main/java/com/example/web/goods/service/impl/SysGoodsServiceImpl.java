package com.example.web.goods.service.impl;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.web.goods.entity.GoodsParm;
import com.example.web.goods.entity.SysGoods;
import com.example.web.goods.service.SysGoodsService;
import com.example.web.goods.mapper.SysGoodsMapper;
import com.example.web.goods_specs.entity.SysGoodsSpecs;
import com.example.web.goods_specs.service.SysGoodsSpecsService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author 陈
 * @description 针对表【sys_goods】的数据库操作Service实现
 * @createDate 2024-06-28 11:11:09
 */
@Service
public class SysGoodsServiceImpl extends ServiceImpl<SysGoodsMapper, SysGoods> implements SysGoodsService {

    @Autowired
    private SysGoodsSpecsService sysGoodsSpecsService;

    @Override
    @Transactional
    public void saveGoods(GoodsParm parm) {
        //1.保存菜品
        SysGoods goods = new SysGoods();
        BeanUtils.copyProperties(parm, goods);
        int insert = this.baseMapper.insert(goods);
        //2.保存规格价格
        if (insert > 0) {
            List<SysGoodsSpecs> specs = parm.getSpecs();
            for (SysGoodsSpecs spec : specs) {
                //设置菜品id
                spec.setGoodsId(goods.getGoodsId());
            }
            //批量插入
            sysGoodsSpecsService.saveBatch(specs);
        }
    }

    @Override
    @Transactional
    public void editGoods(GoodsParm parm) {
        //1.保存菜品
        SysGoods goods = new SysGoods();
        BeanUtils.copyProperties(parm, goods);
        int insert = this.baseMapper.updateById(goods);
        //2.删除菜品原来的规格
        QueryWrapper<SysGoodsSpecs> wrapper = new QueryWrapper<>();
        wrapper.lambda().eq(SysGoodsSpecs::getGoodsId, goods.getGoodsId());
        sysGoodsSpecsService.remove(wrapper);
        //3.保存规格价格
        if (insert > 0) {
            List<SysGoodsSpecs> specs = parm.getSpecs();
            for (SysGoodsSpecs spec : specs) {
                //设置菜品id
                spec.setGoodsId(goods.getGoodsId());
            }
            //批量插入
            sysGoodsSpecsService.saveBatch(specs);
        }
    }

    @Override
    public void deleteGoods(Integer goodsId) {
        //1.删除菜品
        int i = this.baseMapper.deleteById(goodsId);
        //2.删除规格
        if(i>0){
            QueryWrapper<SysGoodsSpecs> wrapper = new QueryWrapper<>();
            wrapper.lambda().eq(SysGoodsSpecs::getGoodsId, goodsId);
            sysGoodsSpecsService.remove(wrapper);
        }

    }
}




