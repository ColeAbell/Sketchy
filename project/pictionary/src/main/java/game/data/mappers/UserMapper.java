package game.data.mappers;


import org.springframework.jdbc.core.RowMapper;

import game.model.User;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;

public class UserMapper implements RowMapper<User> {
    @Override
    public User mapRow(ResultSet resultSet, int i) throws SQLException {
        User user = new User();
        user.setUserId(resultSet.getInt("userId"));
        user.setUserName(resultSet.getString("userName"));
        user.setPoints(resultSet.getInt("points"));
        user.setIsDrawing(resultSet.getBoolean("isDrawing"));
        user.setLastActive(resultSet.getObject("lastActive", LocalDateTime.class));
        return user;
    }
}
