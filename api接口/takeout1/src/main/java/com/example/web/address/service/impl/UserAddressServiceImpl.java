package com.example.web.address.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.web.address.entity.UserAddress;
import com.example.web.address.service.UserAddressService;
import com.example.web.address.mapper.UserAddressMapper;
import org.springframework.stereotype.Service;

/**
* @author 陈
* @description 针对表【user_address】的数据库操作Service实现
* @createDate 2024-07-22 20:56:12
*/
@Service
public class UserAddressServiceImpl extends ServiceImpl<UserAddressMapper, UserAddress>
    implements UserAddressService{

}




