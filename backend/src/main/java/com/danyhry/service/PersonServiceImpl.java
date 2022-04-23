package com.danyhry.service;

import com.danyhry.dao.PersonDao;
import com.danyhry.exception.NotFoundException;
import com.danyhry.model.Person;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class PersonServiceImpl implements PersonService {

    private final PersonDao personDao;

    public PersonServiceImpl(PersonDao personDao) {
        this.personDao = personDao;
    }

    @Override
    public List<Person> getAllPersons() {
        return personDao.getAllPersons();
    }

    @Override
    public Person getPersonById(Long id) {
        return personDao.getPersonById(id)
                .orElseThrow(() -> new NotFoundException("Not found person by id = " + id));
    }

    @Override
    public void insertPerson(Person person) {
        if (person == null) {
            throw new IllegalStateException("Could not add person");
        }
        int result = personDao.insertPerson(person);
        if (result != 1) {
            throw new IllegalStateException("Could not add person");
        }
    }

    @Override
    public void deletePersonById(Long id) {
        Optional<Person> persons = personDao.getPersonById(id);
        persons.ifPresentOrElse(person -> {
            int result = personDao.deletePersonById(id);
            if (result != 1) {
                log.error("Could not delete person");
                throw new IllegalStateException("Could not delete person");
            }
        }, () -> {
            log.error(String.format("Person with id %s not found", id));
            throw new NotFoundException(String.format("Person with id %s not found", id));
        });
    }

    @Override
    public void editPerson(Person person, Long id) {
        Optional<Person> persons = personDao.getPersonById(id);
        persons.ifPresentOrElse(firstPerson -> {
            int result = personDao.editPerson(person, id);
            if (result != 1) {
                log.error("Could not update person");
                throw new IllegalStateException("Could not update person");
            }
            log.info("Person was updated");
        }, () -> {
            log.error(String.format("Person with id %s not found", id));
            throw new NotFoundException(String.format("Person with id %s not found", id));
        });
    }
}
