package com.danyhry.service;

import com.danyhry.model.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();

    User getUserById(Long id);

    void insertUser(User user);

    void deleteUserById(Long id);

    void editUser(User user, Long id);
}
