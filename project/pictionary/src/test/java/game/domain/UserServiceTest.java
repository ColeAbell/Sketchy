package game.domain;

import game.data.UserRepository;
import game.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class UserServiceTest {

    @Autowired
    UserService service;

    @MockBean
    UserRepository repository;

    @Test
    void shouldAdd() {
        User user = makeUser();
        Result<User> actual = service.add(user);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotAddWhenInvalid() {
        User user = makeUser();
        user.setUserId(50);
        Result<User> actual = service.add(user);
        assertEquals(ResultType.INVALID, actual.getType());

        user.setUserId(0);
        user.setUserName(null);
        actual = service.add(user);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldUpdate() {
        User user = makeUser();
        user.setUserId(1);

        when(repository.update(user)).thenReturn(true);
        Result<User> actual = service.update(user);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdateMissing() {
        User user = makeUser();

        when(repository.update(user)).thenReturn(false);
        Result<User> actual = service.update(user);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
    }

    @Test
    void shouldNotUpdateWhenInvalid() {
        User user = makeUser();

        Result<User> actual = service.update(user);
        assertEquals(ResultType.INVALID, actual.getType());

        user.setUserName(null);
        actual = service.update(user);
        assertEquals(ResultType.INVALID, actual.getType());

        user.setUserId(0);
        user.setUserName("Test");
        actual = service.update(user);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    User makeUser() {
        User user = new User();
        user.setUserId(0);
        user.setUserName("Test");
        user.setPoints(0);
        user.setIsDrawing(false);
        return user;
    }
}