package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class LoginControllerImpl implements LoginController {

    @RequestMapping("/login")
    @Override
    public String loginPage() {
        return "login";
    }
}