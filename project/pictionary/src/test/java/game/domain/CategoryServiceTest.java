package game.domain;

import game.data.CategoryRepository;
import game.model.Category;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class CategoryServiceTest {

    @Autowired
    CategoryService service;

    @MockBean
    CategoryRepository repository;

    @Test
    void shouldAdd() {
        Category category = makeCategory();
        Result<Category> actual = service.add(category);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotAddWhenInvalid() {
        Category category = makeCategory();
        category.setCategoryId(50);
        Result<Category> actual = service.add(category);
        assertEquals(ResultType.INVALID, actual.getType());

        category.setCategoryId(0);
        category.setType(null);
        actual = service.add(category);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldUpdate() {
        Category category = makeCategory();
        category.setCategoryId(1);

        when(repository.update(category)).thenReturn(true);
        Result<Category> actual = service.update(category);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdateMissing() {
        Category category = makeCategory();

        when(repository.update(category)).thenReturn(false);
        Result<Category> actual = service.update(category);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
    }

    @Test
    void shouldNotUpdateWhenInvalid() {
        Category category = makeCategory();

        Result<Category> actual = service.update(category);
        assertEquals(ResultType.INVALID, actual.getType());

        category.setType(null);
        actual = service.update(category);
        assertEquals(ResultType.INVALID, actual.getType());

        category.setCategoryId(0);
        category.setType("Test");
        actual = service.update(category);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    Category makeCategory() {
        Category category = new Category();
        category.setCategoryId(0);
        category.setType("Test");
        return category;
    }
}