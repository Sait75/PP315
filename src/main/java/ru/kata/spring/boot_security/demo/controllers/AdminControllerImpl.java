package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class AdminControllerImpl implements AdminController {
    @RequestMapping("/admin")
    @Override
    public String adminPage() {
        return "admin";
    }
}
