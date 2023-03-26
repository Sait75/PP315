package ru.kata.spring.boot_security.demo.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserDetailServiceImpl;
import ru.kata.spring.boot_security.demo.services.UserService;
import java.security.Principal;



@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;
    private final UserDetailServiceImpl userDetailService;
    @Autowired
    public AdminController(UserService userService, RoleService roleService, UserDetailServiceImpl userDetailService) {
        this.userService = userService;
        this.roleService = roleService;
        this.userDetailService = userDetailService;
    }

    @GetMapping()
    public String showAllUser(Model model, Principal principal) {
        model.addAttribute("allUsers", userService.getAllUsers());
        model.addAttribute("admin", userDetailService.findByUsername(principal.getName()));
        model.addAttribute("roles", roleService.getAllRoles());
        model.addAttribute("user", new User());
        return "admin";
    }


//
//    @PostMapping()
//    public String addUser(@ModelAttribute("user") User user) {
//        userService.addUser(user);
//        return "redirect:/admin";
//    }
//
//    @DeleteMapping("/deleteUser/{id}")
//    public String delUser(@PathVariable("id") Long id) {
//        userService.delUser(id);
//        return "redirect:/admin";
//    }
//
//    @GetMapping("/edit/{id}")
//    public String editUser(Model model, @PathVariable("id") Long id) {
//        model.addAttribute("user", userService.getUserById(id));
//        model.addAttribute("roles", roleService.getAllRoles());
//        return "redirect:/admin";
//    }

}
