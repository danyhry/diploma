package com.danyhry.dao;

import com.danyhry.model.User;

import java.util.List;
import java.util.Optional;

public interface UserDao {
    List<User> getAllUsers();

    Optional<User> getUserById(Long id);

    int insertUser(User user);

    int deleteUserById(Long id);

    int editUser(User user, Long id);
}
