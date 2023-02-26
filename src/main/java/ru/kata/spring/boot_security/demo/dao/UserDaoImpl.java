package ru.kata.spring.boot_security.demo.dao;


import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.entities.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<User> getAllUsers() {
        return entityManager.createQuery("SELECT u FROM User u", User.class).getResultList();
    }

    @Override
    public User getUserById(Long id) {
        return entityManager.find(User.class, id);
    }

    @Override
    public User getUserByName(String name) {
        return entityManager.createQuery("SELECT u FROM User u WHERE u.username =:name", User.class)
                .setParameter("name", name)
                .getSingleResult();
    }

    @Override
    public void addUser(User user) {
        entityManager.persist(user);
    }

    @Override
    public void delUser(Long id) {
        entityManager.remove(getUserById(id));
    }

    @Override
    public void updUser(User user, Long id) {

        User updateUser = entityManager.find(User.class, id);
        updateUser.setUsername(user.getUsername());
        updateUser.setPassword(user.getPassword());
        updateUser.setEmail(user.getEmail());
        updateUser.setRoles(user.getRoles());
        entityManager.merge(updateUser);

    }
}
