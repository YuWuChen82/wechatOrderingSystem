package com.example.web.goods_specs.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.math.BigDecimal;
import lombok.Data;

/**
 * 
 * @TableName sys_goods_specs
 */
@TableName(value ="sys_goods_specs")
@Data
public class SysGoodsSpecs implements Serializable {
    /**
     * 规格id
     */
    @TableId(type = IdType.AUTO)
    private Integer specsId;

    /**
     * 菜品id
     */
    private Integer goodsId;

    /**
     * 规格名称
     */
    private String specsName;

    /**
     * 价格
     */
    private BigDecimal goodsPrice;

    /**
     * 序号
     */
    private Integer orderNum;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

    @Override
    public boolean equals(Object that) {
        if (this == that) {
            return true;
        }
        if (that == null) {
            return false;
        }
        if (getClass() != that.getClass()) {
            return false;
        }
        SysGoodsSpecs other = (SysGoodsSpecs) that;
        return (this.getSpecsId() == null ? other.getSpecsId() == null : this.getSpecsId().equals(other.getSpecsId()))
            && (this.getGoodsId() == null ? other.getGoodsId() == null : this.getGoodsId().equals(other.getGoodsId()))
            && (this.getSpecsName() == null ? other.getSpecsName() == null : this.getSpecsName().equals(other.getSpecsName()))
            && (this.getGoodsPrice() == null ? other.getGoodsPrice() == null : this.getGoodsPrice().equals(other.getGoodsPrice()))
            && (this.getOrderNum() == null ? other.getOrderNum() == null : this.getOrderNum().equals(other.getOrderNum()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getSpecsId() == null) ? 0 : getSpecsId().hashCode());
        result = prime * result + ((getGoodsId() == null) ? 0 : getGoodsId().hashCode());
        result = prime * result + ((getSpecsName() == null) ? 0 : getSpecsName().hashCode());
        result = prime * result + ((getGoodsPrice() == null) ? 0 : getGoodsPrice().hashCode());
        result = prime * result + ((getOrderNum() == null) ? 0 : getOrderNum().hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", specsId=").append(specsId);
        sb.append(", goodsId=").append(goodsId);
        sb.append(", specsName=").append(specsName);
        sb.append(", goodsPrice=").append(goodsPrice);
        sb.append(", orderNum=").append(orderNum);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}