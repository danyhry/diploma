package com.danyhry.dao;

import com.danyhry.model.Person;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class PersonRowMapper implements RowMapper<Person> {

    @Override
    public Person mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Person(
                rs.getLong("id"),
                rs.getString("name"),
                rs.getString("surname"),
                rs.getInt("age")
        );

    }
}
