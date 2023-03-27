package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entities.Role;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.services.RoleServiceImpl;
import ru.kata.spring.boot_security.demo.services.UserDetailServiceImpl;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class RESTControllerImpl implements RESTController {

    private final UserService userService;
    private final UserDetailServiceImpl userDetailService;
    private final RoleServiceImpl roleService;

    @Autowired
    public RESTControllerImpl(UserService userService, UserDetailServiceImpl userDetailService, RoleServiceImpl roleService) {
        this.userService = userService;
        this.userDetailService = userDetailService;
        this.roleService = roleService;
    }

    @GetMapping("/admin")
    @Override
    public ResponseEntity<List<User>> showAllUser() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/roles")
    @Override
    public ResponseEntity<List<Role>> getAllRoles() {
        return new ResponseEntity<>(roleService.getAllRoles(), HttpStatus.OK);
    }

    @GetMapping("/admin/{id}")
    @Override
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);

    }

    @GetMapping("/user")
    @Override
    public ResponseEntity<User> userPage(Principal principal) {
        return new ResponseEntity<>(userDetailService.findByUsername(principal.getName()), HttpStatus.OK);
    }

    @PostMapping("/admin")
    @Override
    public User addNewUser(@RequestBody User user) {
        userService.addUser(user);
        return user;
    }

    @PutMapping("/admin")
    public User updateUser(@RequestBody User user) {
        userService.addUser(user);
        return user;
    }

    @DeleteMapping("/admin/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.delUser(id);
    }
}
