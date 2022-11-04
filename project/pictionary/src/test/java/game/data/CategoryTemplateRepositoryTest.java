package game.data;

import game.model.Category;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class CategoryTemplateRepositoryTest {
    @Autowired
    CategoryTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldAddCategory() {
        Category category = new Category();
        category.setType("Movies");
        Category actual = repository.add(category);
        assertNotNull(actual);
        assertEquals(1, actual.getCategoryId());
    }

    @Test
    void shouldFindAll() {
        List<Category> categories = repository.findAll();
        assertNotNull(categories);
        assertTrue(categories.size() > 0);
    }

    @Test
    void shouldFindById() {
        Category category = repository.findById(1);
        assertEquals("Movies", category.getType());
    }

    @Test
    void shouldUpdateCategory() {

        Category category = new Category();
        category.setCategoryId(1);
        category.setType("Books");

        assertTrue(repository.update(category));
    }

    @Test
    void shouldDeleteCategory() {
        assertTrue(repository.deleteById(1));
        assertFalse(repository.deleteById(200));
    }
}
