package com.danyhry.controller;

import com.danyhry.model.Person;
import com.danyhry.service.PersonService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/persons")
@Slf4j
public class PersonController {

    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping
    public List<Person> getAllPerson() {
        return personService.getAllPersons();
    }

    @GetMapping("/{id}")
    public Person getPersonById(@PathVariable Long id) {
        return personService.getPersonById(id);
    }

    @PostMapping
    public void insertPerson(@RequestBody Person person) {
        personService.insertPerson(person);
    }

    @PutMapping("/{id}")
    public void editPerson(@RequestBody Person person, @PathVariable Long id) {
        personService.editPerson(person, id);
    }

    @DeleteMapping("/{id}")
    public void deletePersonById(@PathVariable Long id) {
        personService.deletePersonById(id);
    }
}
