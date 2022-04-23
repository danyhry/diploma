package com.danyhry.dao;

import com.danyhry.model.Person;

import java.util.List;
import java.util.Optional;

public interface PersonDao {
    List<Person> getAllPersons();

    Optional<Person> getPersonById(Long id);

    int insertPerson(Person person);

    int deletePersonById(Long id);

    int editPerson(Person person, Long id);
}
