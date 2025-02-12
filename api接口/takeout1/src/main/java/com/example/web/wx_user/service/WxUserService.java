package com.example.web.wx_user.service;

import com.example.web.wx_user.entity.WxUser;
import com.baomidou.mybatisplus.extension.service.IService;

/**
* @author 陈
* @description 针对表【wx_user】的数据库操作Service
* @createDate 2024-07-28 18:42:00
*/
public interface WxUserService extends IService<WxUser> {
    int saveOrUpdateInfo(WxUser wxUser);
}
