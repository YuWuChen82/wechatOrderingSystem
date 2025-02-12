package com.example.web.goods.entity;

import lombok.Data;

@Data
public class ListParm {
    private Integer currentPage;
    private Integer pageSize;
    private String goodsName;
}
