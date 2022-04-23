package com.danyhry.service;

import com.danyhry.model.Person;

import java.util.List;

public interface PersonService {
    List<Person> getAllPersons();

    Person getPersonById(Long id);

    void insertPerson(Person person);

    void deletePersonById(Long id);

    void editPerson(Person person, Long id);
}
