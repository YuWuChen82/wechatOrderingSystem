package com.example.takeout1;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.example.takeout1.mapper")
public class Takeout1Application {

    public static void main(String[] args) {
        SpringApplication.run(Takeout1Application.class, args);
    }

}
