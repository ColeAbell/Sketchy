package game.data;

import game.data.mappers.UserMapper;
import game.model.Category;
import game.model.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class UserTemplateRepository implements UserRepository{
    private final JdbcTemplate jdbcTemplate;

    public UserTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<User> findAll() {
        final String sql = "select userId, userName, points, isDrawing, lastActive, lastDrawn "
                + "from User limit 1000;";
        return jdbcTemplate.query(sql, new UserMapper());
    }

    @Override
    @Transactional
    public User findById(int userId) {

        final String sql = "select userId, userName, points, isDrawing, lastActive, lastDrawn "
                + "from User "
                + "where userId = ?;";

        return jdbcTemplate.query(sql, new UserMapper(), userId).stream().findFirst().orElse(null);
    }

    @Override
    public User add(User user) {

        final String sql = "insert into User (userName, points, isDrawing, lastActive) "
                + " values (?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getUserName());
            ps.setInt(2, user.getPoints());
            ps.setBoolean(3, user.getIsDrawing());
            ps.setString(4, LocalDateTime.now().toString());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        user.setUserId(keyHolder.getKey().intValue());
        return user;
    }

    @Override
    public boolean update(User user) {

        final String sql = "update User set "
                + "isDrawing = ?, "
                + "points = ?, "
                + "lastActive = ?, "
                + "lastDrawn = ? "
                + "where userId = ?;";

        return jdbcTemplate.update(sql,
                user.getIsDrawing(),
                user.getPoints(),
                LocalDateTime.now().toString(),
                user.getLastDrawn() == null ? user.getLastDrawn() : user.getLastDrawn().toString(),
                user.getUserId()) > 0;
    }

    @Override
    @Transactional
    public boolean deleteById(int userId) {
        return jdbcTemplate.update("delete from User where userId = ?;", userId) > 0;
    }
}
