package game.data;

import game.model.Question;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface QuestionRepository {
    List<Question> findAll();

    Question findById(int questionId);

    Question add(Question question);

    boolean update(Question question);

    @Transactional
    boolean deleteById(int questionId);
}
