package game.data;

import game.model.Category;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CategoryRepository {
    List<Category> findAll();

    Category findById(int categoryId);

    Category add(Category category);

    boolean update(Category category);

    @Transactional
    boolean deleteById(int categoryId);
}
