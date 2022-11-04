package game.data;

import game.model.Question;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class QuestionTemplateRepositoryTest {
    @Autowired
    QuestionTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<Question> questions = repository.findAll();
        assertNotNull(questions);
        assertTrue(questions.size() > 0);
    }

    @Test
    void shouldFindById() {
        Question question = repository.findById(1);
        assertEquals("??", question.getContent());
    }

    @Test
    void shouldAddQuestion() {
        Question question = new Question();
        question.setContent("R2-D2");
        question.setCategoryId(1);
        Question actual = repository.add(question);
        assertNotNull(actual);
        assertEquals(2, actual.getQuestionId());
    }

    @Test
    void shouldUpdateQuestion() {
        Question question = new Question();
        question.setQuestionId(2);
        question.setContent("C3PO");
        question.setCategoryId(1);
        assertTrue(repository.update(question));
    }

    @Test
    void shouldDeleteQuestion() {
        assertTrue(repository.deleteById(2));
        assertFalse(repository.deleteById(200));
    }
}
