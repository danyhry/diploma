package com.danyhry.dao;

import com.danyhry.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Slf4j
public class UserDaoImpl implements UserDao {

    private final JdbcTemplate jdbcTemplate;

    public UserDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<User> getAllUsers() {
        String sql = "SELECT * FROM person LIMIT 100";
        return jdbcTemplate.query(sql, new UserRowMapper());
    }

    @Override
    public Optional<User> getUserById(Long id) {
        String sql = "SELECT * FROM person WHERE id = ?";
        return jdbcTemplate.query(sql, new UserRowMapper(), id)
                .stream()
                .findFirst();
    }

    @Override
    public int insertUser(User user) {
        String sql = "INSERT INTO person(name, surname, age) VALUES (?, ?, ?)";
        return jdbcTemplate.update(sql, user.getName(), user.getSurname(), user.getAge());
    }

    @Override
    public int deleteUserById(Long id) {
        String sql = "DELETE FROM person WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }

    @Override
    public int editUser(User user, Long id) {
        String sql = "UPDATE person SET name = ?, surname = ?, age = ? WHERE id = ?";
        log.info("User name: " + user.getName());
        return jdbcTemplate.update(sql, user.getName(), user.getSurname(), user.getAge(), id);
    }
}
