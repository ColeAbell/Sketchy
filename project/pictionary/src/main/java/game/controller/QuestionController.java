package game.controller;

import game.domain.QuestionService;
import game.domain.Result;
import game.model.Question;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/question")
public class QuestionController {
    private final QuestionService service;

    public QuestionController(QuestionService service) {
        this.service = service;
    }

    @GetMapping
    public List<Question> findAll() {
        return service.findAll();
    }

    @GetMapping("/{questionId}")
    public Question findById(@PathVariable int questionId) {
        return service.findById(questionId);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Question question) {
        Result<Question> result = service.add(question);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{questionId}")
    public ResponseEntity<Object> update(@PathVariable int questionId, @RequestBody Question question) {
        if (questionId != question.getQuestionId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Question> result = service.update(question);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{questionId}")
    public ResponseEntity<Void> deleteById(@PathVariable int qestionId) {
        if (service.deleteById(qestionId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
