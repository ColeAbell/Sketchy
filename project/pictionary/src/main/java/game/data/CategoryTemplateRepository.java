package game.data;

import game.data.mappers.CategoryMapper;
import game.model.Category;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class CategoryTemplateRepository implements CategoryRepository{

    private final JdbcTemplate jdbcTemplate;

    public CategoryTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Category> findAll() {
        final String sql = "select categoryId, `type` "
                + "from Category limit 1000;";
        return jdbcTemplate.query(sql, new CategoryMapper());
    }

    @Override
    @Transactional
    public Category findById(int categoryId) {

        final String sql = "select categoryId, `type` "
                + "from Category "
                + "where categoryId = ?;";

        return jdbcTemplate.query(sql, new CategoryMapper(), categoryId).stream().findFirst().orElse(null);
    }

    @Override
    public Category add(Category category) {

        final String sql = "insert into Category (`type`) "
                + " values (?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, category.getType());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        category.setCategoryId(keyHolder.getKey().intValue());
        return category;
    }

    @Override
    public boolean update(Category category) {

        final String sql = "update Category set "
                + "`type` = ? "
                + "where categoryId = ?;";

        return jdbcTemplate.update(sql,
                category.getType(),
                category.getCategoryId()) > 0;
    }

    @Override
    @Transactional
    public boolean deleteById(int categoryId) {
        jdbcTemplate.update("delete from Question where categoryId = ?;", categoryId);
        return jdbcTemplate.update("delete from Category where categoryId = ?;", categoryId) > 0;
    }
}
