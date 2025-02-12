package com.example.web.category.entity;

import lombok.Data;

@Data
public class ListParm {
    private Integer currentPage;
    private Integer pageSize;
    private String categoryName;
}
