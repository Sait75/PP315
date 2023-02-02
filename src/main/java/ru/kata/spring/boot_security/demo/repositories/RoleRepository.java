package ru.kata.spring.boot_security.demo.repositories;

//import com.flamexander.springsecuritypack.entities.Role;
import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.entities.Role;

@Repository
//@Profile("dao")
public interface RoleRepository extends JpaRepository<Role, Long> {
}
