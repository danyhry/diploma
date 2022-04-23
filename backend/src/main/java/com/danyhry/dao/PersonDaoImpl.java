package com.danyhry.dao;

import com.danyhry.model.Person;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Slf4j
public class PersonDaoImpl implements PersonDao {

    private final JdbcTemplate jdbcTemplate;

    public PersonDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Person> getAllPersons() {
        String sql = "SELECT * FROM person LIMIT 100";
        return jdbcTemplate.query(sql, new PersonRowMapper());
    }

    @Override
    public Optional<Person> getPersonById(Long id) {
        String sql = "SELECT * FROM person WHERE id = ?";
        return jdbcTemplate.query(sql, new PersonRowMapper(), id)
                .stream()
                .findFirst();
    }

    @Override
    public int insertPerson(Person person) {
        String sql = "INSERT INTO person(name, surname, age) VALUES (?, ?, ?)";
        return jdbcTemplate.update(sql, person.getName(), person.getSurname(), person.getAge());
    }

    @Override
    public int deletePersonById(Long id) {
        String sql = "DELETE FROM person WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }

    @Override
    public int editPerson(Person person, Long id) {
        String sql = "UPDATE person SET name = ?, surname = ?, age = ? WHERE id = ?";
        log.info("person name: " + person.getName());
        return jdbcTemplate.update(sql, person.getName(), person.getSurname(), person.getAge(), id);
    }
}
