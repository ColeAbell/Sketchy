package game.domain;

import game.data.UserRepository;
import game.model.Category;
import game.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repo){
        this.repository = repo;
    }

    public List<User> findAll() {return repository.findAll();}

    public User findById(int userId) {
        return repository.findById(userId);
    }

    public Result<User> add(User user){
        Result<User> result = validate(user);
        if(!result.isSuccess()){
            return result;
        }
        if (user.getUserId() != 0) {
            result.addMessage("User ID cannot be set for `add` operation", ResultType.INVALID);
            return result;
        }
        result.setPayload(repository.add(user));
        return result;
    }

    public Result<User> update(User user){
        Result<User> result = validate(user);
        if(!result.isSuccess()){
            return result;
        }

        if (!repository.update(user)) {
            String msg = String.format("categoryId: %s, not found", user.getUserId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }
        return result;
    }

    public boolean deleteById(int id){
        return repository.deleteById(id);
    }


    private Result<User> validate(User user) {
        Result<User> result = new Result<>();
        if (user == null) {
            result.addMessage("user cannot be null", ResultType.INVALID);
            return result;
        }

        if (Validations.isNullOrBlank(user.getUserName())) {
            result.addMessage("username is required", ResultType.INVALID);
        }

        return result;
    }
}
