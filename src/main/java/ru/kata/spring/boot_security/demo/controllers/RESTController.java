package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import ru.kata.spring.boot_security.demo.entities.Role;
import ru.kata.spring.boot_security.demo.entities.User;

import java.security.Principal;
import java.util.List;

public interface RESTController {

    ResponseEntity<List<User>> showAllUser();

    ResponseEntity<List<Role>> getAllRoles();

    ResponseEntity<User> getUserById(@PathVariable Long id);

    ResponseEntity<User> userPage(Principal principal);

    User addNewUser(@RequestBody User user);

    User updateUser(@RequestBody User user);

    void deleteUser(@PathVariable Long id);
}
