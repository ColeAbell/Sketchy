package game.domain;

import game.data.QuestionRepository;
import game.model.Category;
import game.model.Question;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

    private final QuestionRepository repository;

    public QuestionService(QuestionRepository repo){
        this.repository = repo;
    }

    public List<Question> findAll() {return repository.findAll();}

    public Question findById(int questionId) {
        return repository.findById(questionId);
    }

    public Result<Question> add(Question question){
        Result<Question> result = validate(question);
        if(!result.isSuccess()){
            return result;
        }
        if (question.getQuestionId() != 0) {
            result.addMessage("Question ID cannot be set for `add` operation", ResultType.INVALID);
            return result;
        }
        result.setPayload(repository.add(question));
        return result;
    }

    public Result<Question> update(Question question){
        Result<Question> result = validate(question);
        if(!result.isSuccess()){
            return result;
        }
        if (question.getQuestionId() <= 0) {
            result.addMessage("question id must be set for `update` operation", ResultType.INVALID);
            return result;
        }

        if (!repository.update(question)) {
            String msg = String.format("questionId: %s, not found", question.getQuestionId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }
        return result;
    }

    public boolean deleteById(int id){
        return repository.deleteById(id);
    }


    private Result<Question> validate(Question question) {
        Result<Question> result = new Result<>();
        if (question == null) {
            result.addMessage("question cannot be null", ResultType.INVALID);
            return result;
        }

        if (Validations.isNullOrBlank(question.getContent())) {
            result.addMessage("content is required", ResultType.INVALID);
        }

        if(repository.findAll().stream().anyMatch(a -> a.getContent().equalsIgnoreCase(question.getContent()))){
            result.addMessage("Prompt already in use", ResultType.INVALID);
        }

        if(question.getCategoryId() == 0){
            result.addMessage("Category ID required", ResultType.INVALID);
        }

        return result;
    }


}
