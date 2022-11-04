package game.domain;

import game.data.QuestionRepository;
import game.model.Question;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class QuestionServiceTest {

    @Autowired
    QuestionService service;

    @MockBean
    QuestionRepository repository;

    @Test
    void shouldAdd() {
        Question question = makeQuestion();
        Result<Question> actual = service.add(question);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotAddWhenInvalid() {
        Question question = makeQuestion();
        question.setQuestionId(50);
        Result<Question> actual = service.add(question);
        assertEquals(ResultType.INVALID, actual.getType());

        question.setQuestionId(0);
        question.setContent(null);
        actual = service.add(question);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldUpdate() {
        Question question = makeQuestion();
        question.setQuestionId(1);

        when(repository.update(question)).thenReturn(true);
        Result<Question> actual = service.update(question);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdateMissing() {
        Question question = makeQuestion();

        when(repository.update(question)).thenReturn(false);
        Result<Question> actual = service.update(question);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
    }

    @Test
    void shouldNotUpdateWhenInvalid() {
        Question question = makeQuestion();

        Result<Question> actual = service.update(question);
        assertEquals(ResultType.INVALID, actual.getType());

        question.setContent(null);
        actual = service.update(question);
        assertEquals(ResultType.INVALID, actual.getType());

        question.setQuestionId(0);
        question.setContent("Test");
        actual = service.update(question);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    Question makeQuestion() {
        Question question = new Question();
        question.setQuestionId(0);
        question.setContent("Test");
        question.setCategoryId(1);
        return question;
    }
}