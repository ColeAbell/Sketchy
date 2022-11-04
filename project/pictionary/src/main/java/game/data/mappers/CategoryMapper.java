package game.data.mappers;

import game.model.Category;
import org.springframework.jdbc.core.RowMapper;
import game.model.Category;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CategoryMapper implements RowMapper<Category> {
    @Override
    public Category mapRow(ResultSet resultSet, int i) throws SQLException {
        Category category = new Category();
        category.setCategoryId(resultSet.getInt("categoryId"));
        category.setType(resultSet.getString("type"));
        return category;
    }
}
