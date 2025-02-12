package com.example.web.goods.entity;

import com.example.web.goods_specs.entity.SysGoodsSpecs;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class GoodsParm {
    private Integer goodsId;
    private Integer categoryId;
    private String goodsName;
    private String goodsImage;
    private String goodsDesc;
    private String status;
    private String goodsUnit;

    private Integer orderNum;
    private List<SysGoodsSpecs> specs = new ArrayList<>();
}
