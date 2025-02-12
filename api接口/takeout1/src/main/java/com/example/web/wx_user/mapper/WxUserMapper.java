package com.example.web.wx_user.mapper;

import com.example.web.wx_user.entity.WxUser;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;

/**
* @author 陈
* @description 针对表【wx_user】的数据库操作Mapper
* @createDate 2024-07-28 18:42:00
* @Entity com.example.web.wx_user.entity.WxUser
*/
public interface WxUserMapper extends BaseMapper<WxUser> {
    int saveOrUpdateInfo(@Param("user") WxUser user);
}




