package ru.kata.spring.boot_security.demo.dao;



import ru.kata.spring.boot_security.demo.entities.User;

import java.util.List;

public interface UserDao {
    public List<User> getAllUsers();
    public User getUserById(Long id);
    public User getUserByName(String name);
    public void addUser(User user);
    public void delUser(Long id);
    public void updUser(User user, Long id);
}
