package ru.kata.spring.boot_security.demo.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.entities.User;

import java.util.List;


public interface UserService{
    public List<User> getAllUsers();

    public User getUserById(Long id);

    public void addUser(User user);

    public void delUser(Long id);
}

