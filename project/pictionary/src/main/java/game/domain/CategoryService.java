package game.domain;

import game.data.CategoryRepository;
import game.model.Category;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository repository;

    public CategoryService(CategoryRepository repository){
        this.repository = repository;
    }
    public List<Category> findAll() {return repository.findAll();}
    public Category findById(int categoryId) {
        return repository.findById(categoryId);
    }

    public Result<Category> add(Category category){
        Result<Category> result = validate(category);
        if(!result.isSuccess()){
            return result;
        }
        if (category.getCategoryId() != 0) {
            result.addMessage("Category ID cannot be set for `add` operation", ResultType.INVALID);
            return result;
        }
        result.setPayload(repository.add(category));
        return result;
    }

    public Result<Category> update(Category category){
        Result<Category> result = validate(category);
        if(!result.isSuccess()){
            return result;
        }
        if (category.getCategoryId() <= 0) {
            result.addMessage("Category id must be set for `update` operation", ResultType.INVALID);
            return result;
        }

        if (!repository.update(category)) {
            String msg = String.format("categoryId: %s, not found", category.getCategoryId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }
        return result;
    }

    public boolean deleteById(int categoryId){
        return repository.deleteById(categoryId);
    }


    private Result<Category> validate(Category category) {
        Result<Category> result = new Result<>();
        if (category == null) {
            result.addMessage("category cannot be null", ResultType.INVALID);
            return result;
        }

        if (Validations.isNullOrBlank(category.getType())) {
            result.addMessage("category type is required", ResultType.INVALID);
        }

        if(repository.findAll().stream().anyMatch(a -> a.getType().equalsIgnoreCase(category.getType()))){
            result.addMessage("Type already in use", ResultType.INVALID);
        }

        return result;
    }
}
