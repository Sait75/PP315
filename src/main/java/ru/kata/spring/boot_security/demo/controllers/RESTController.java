package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.services.UserDetailServiceImpl;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class RESTController {

    private final UserService userService;
    private final UserDetailServiceImpl userDetailService;

    @Autowired
    public RESTController(UserService userService, UserDetailServiceImpl userDetailService) {
        this.userService = userService;

        this.userDetailService = userDetailService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> showAllUser() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        System.out.println(userService.getUserById(id));
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);

    }
    @GetMapping("/user")
    public ResponseEntity<User> userPage(Principal principal) {
        return new ResponseEntity<>(userDetailService.findByUsername(principal.getName()),HttpStatus.OK);
    }
//    @GetMapping("/user")
//    public ResponseEntity<User> getThisUser(Principal principal) {
//        return new ResponseEntity<>(userService.findByUsername(principal.getName()).get(), HttpStatus.OK);

    @PostMapping("/users")
    public User addNewUser(@RequestBody User user) {
        userService.addUser(user);
        return user;
    }

    @PutMapping("/users")
    public User updateUser(@RequestBody User user) {
        userService.addUser(user);
        return user;
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.delUser(id);
    }


}
