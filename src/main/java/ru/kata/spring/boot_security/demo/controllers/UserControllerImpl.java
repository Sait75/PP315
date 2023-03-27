package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class UserControllerImpl implements UserController {

    @RequestMapping("/user")
    @Override
    public String userPage() {
        return "user";
    }
}
