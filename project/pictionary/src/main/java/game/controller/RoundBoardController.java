package game.controller;

import game.domain.Result;
import game.domain.RoundBoardService;
import game.model.RoundBoard;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/roundboard")
public class RoundBoardController {
    private final RoundBoardService service;

    public RoundBoardController(RoundBoardService service) {
        this.service = service;
    }

    @GetMapping
    public List<RoundBoard> findAll(){return service.findAll();}

    @GetMapping("/{roundBoardId}")
    public RoundBoard findById(@PathVariable int roundBoardId) {
        return service.findById(roundBoardId);
    }

    @PutMapping("/{boardId}")
    public ResponseEntity<Object> update(@PathVariable int boardId, @RequestBody RoundBoard roundBoard) {
        System.out.println("attempting update");
        if (boardId != roundBoard.getRoundBoardId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<RoundBoard> result = service.update(roundBoard);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }
    @PostMapping
    public ResponseEntity<Object> add(@RequestBody RoundBoard roundBoard) {
        Result<RoundBoard> result = service.add(roundBoard);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }
}
