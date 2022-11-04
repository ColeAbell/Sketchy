package game.data;

import game.model.Category;
import org.springframework.transaction.annotation.Transactional;

import game.model.User;
import java.util.List;

public interface UserRepository {
    List<User> findAll();

    User findById(int userId);

    User add(User user);

    boolean update(User user);

    @Transactional
    boolean deleteById(int userId);
}
